import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { site } from '@/lib/site';

// Lead pipeline: validate, honeypot, Turnstile, email the lead via Resend, send
// the sender an auto-reply. Every external dependency is optional at runtime so
// a missing key degrades gracefully and never throws at build:
//   RESEND_API_KEY            Resend API key.
//   CONTACT_TO_EMAIL          Cindy's inbox for leads. No fallback; never invented.
//   CONTACT_FROM_EMAIL        Verified sender. Falls back to Resend's test sender.
//   TURNSTILE_SECRET_KEY      Server-side Turnstile verification. Skipped if unset.

const submissionSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  city: z.string().trim().min(1).max(200),
  rooms: z.array(z.string().max(100)).max(10).default([]),
  timeline: z.string().max(100).default(''),
  message: z.string().max(5000).default(''),
  // Honeypot field. Humans never see it; bots fill it.
  website: z.string().max(200).default(''),
  turnstileToken: z.string().max(4000).optional(),
});

type Submission = z.infer<typeof submissionSchema>;

async function verifyTurnstile(secret: string, token: string): Promise<boolean> {
  try {
    const res = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: token }),
      },
    );
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

function leadEmailText(data: Submission): string {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `City or ZIP: ${data.city}`,
    `Services: ${data.rooms.length > 0 ? data.rooms.join(', ') : 'None selected'}`,
    `Timeline: ${data.timeline || 'Not specified'}`,
    '',
    'Message:',
    data.message || '(none)',
  ].join('\n');
}

function autoReplyText(data: Submission): string {
  return [
    `Hi ${data.name},`,
    '',
    'Thank you for reaching out. We received your consultation request and will follow up within one business day.',
    '',
    `If you would rather talk now, call us at ${site.phoneDisplay}.`,
    '',
    site.wordmark,
  ].join('\n');
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request' },
      { status: 400 },
    );
  }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Invalid request' },
      { status: 400 },
    );
  }
  const data = parsed.data;

  // Honeypot tripped: report success so bots learn nothing, send nothing.
  if (data.website !== '') {
    return NextResponse.json({ ok: true });
  }

  // Turnstile: verified only when the server has a secret configured.
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const valid =
      typeof data.turnstileToken === 'string' &&
      data.turnstileToken.length > 0 &&
      (await verifyTurnstile(turnstileSecret, data.turnstileToken));
    if (!valid) {
      return NextResponse.json(
        { ok: false, error: 'Verification failed' },
        { status: 400 },
      );
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    // Not configured. In development behave like the old stub so the form can
    // be exercised; in production fail honestly so the caller falls back to
    // the phone number instead of a lead silently going nowhere.
    console.warn(
      '[contact] RESEND_API_KEY or CONTACT_TO_EMAIL not set; lead was not emailed.',
    );
    console.log('[contact] lead:', leadEmailText(data));
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { ok: false, error: 'Email is not configured' },
        { status: 503 },
      );
    }
    return NextResponse.json({ ok: true });
  }

  const from =
    process.env.CONTACT_FROM_EMAIL ??
    `${site.wordmark} <onboarding@resend.dev>`;
  const resend = new Resend(apiKey);

  // The lead email is the one that matters; a failure here is a failure.
  const lead = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: `New consultation request from ${data.name}`,
    text: leadEmailText(data),
  });
  if (lead.error) {
    console.error('[contact] lead email failed:', lead.error);
    return NextResponse.json(
      { ok: false, error: 'Send failed' },
      { status: 502 },
    );
  }

  // The auto-reply is best-effort; never fail the submission over it.
  try {
    const reply = await resend.emails.send({
      from,
      to: data.email,
      subject: 'We received your consultation request',
      text: autoReplyText(data),
    });
    if (reply.error) {
      console.warn('[contact] auto-reply failed:', reply.error);
    }
  } catch (err) {
    console.warn('[contact] auto-reply failed:', err);
  }

  return NextResponse.json({ ok: true });
}
