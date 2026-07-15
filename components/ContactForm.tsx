'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { buttonClasses } from '@/components/Button';
import FormField, { checkboxClasses, Required } from '@/components/FormField';
import { site } from '@/lib/site';

// RESTYLE ONLY. The submit wiring is load-bearing and untouched: field names,
// the /api/contact POST body, the honeypot, the Turnstile token flow, and the
// disabled logic are exactly as before. Only markup and classes changed.

// Rendered only when the widget is configured; the API route only enforces
// verification when its matching secret is configured.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const ROOM_TYPES = [
  'Hoarding & Estate Clearing',
  'Moving & Relocation',
  'Home Organizing',
  'Offices & Paperwork',
];

const TIMELINES = [
  'As soon as possible',
  'Within the next month',
  'In the next few months',
  'Just exploring for now',
];

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [rooms, setRooms] = useState<string[]>([]);
  const [timeline, setTimeline] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  // Honeypot: humans never see this field, bots fill it.
  const [website, setWebsite] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  function toggleRoom(room: string) {
    setRooms((prev) =>
      prev.includes(room) ? prev.filter((r) => r !== room) : [...prev, room],
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          city,
          rooms,
          timeline,
          message,
          website,
          turnstileToken,
        }),
      });
      if (!res.ok) throw new Error('server error');
      setStatus('success');
    } catch {
      // Turnstile tokens are single use; reset so a retry gets a fresh one.
      setTurnstileToken('');
      turnstileRef.current?.reset();
      setStatus('error');
    }
  }

  // The success state, per the reference: a short sage rule, the thanks, the
  // promise line, a way home. No icons.
  if (status === 'success') {
    return (
      <div className="px-2 py-12 text-center sm:px-8 sm:py-16">
        <div aria-hidden="true" className="mx-auto w-16 border-t-2 border-sage" />
        <p className="mt-8 font-display text-[clamp(2.25rem,4vw,3rem)] leading-tight text-ink">
          Thank you.
        </p>
        <p className="mx-auto mt-5 max-w-[26rem] leading-relaxed text-muted">
          Cindy will read your note today and be in touch within one business
          day.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block text-base text-sage-deep underline underline-offset-4 hover:text-sage focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-9">
      <FormField
        id="name"
        label={
          <>
            Your name
            <Required />
          </>
        }
      >
        {(props) => (
          <input
            {...props}
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
      </FormField>

      <FormField
        id="email"
        label={
          <>
            Email address
            <Required />
          </>
        }
      >
        {(props) => (
          <input
            {...props}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
      </FormField>

      <FormField
        id="city"
        label={
          <>
            City or ZIP code
            <Required />
          </>
        }
      >
        {(props) => (
          <input
            {...props}
            type="text"
            required
            autoComplete="postal-code"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        )}
      </FormField>

      {/* Room types */}
      <fieldset>
        <legend className="mb-4 text-sm text-muted">
          Which services are you interested in?
        </legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ROOM_TYPES.map((room) => (
            <label
              key={room}
              className="flex cursor-pointer items-center gap-3 text-base text-ink"
            >
              {/* The input stays the real control and only loses its native
                  paint; the tick is a sibling revealed by peer-checked. */}
              <span className="relative inline-flex shrink-0">
                <input
                  type="checkbox"
                  checked={rooms.includes(room)}
                  onChange={() => toggleRoom(room)}
                  className={checkboxClasses}
                />
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="pointer-events-none absolute inset-0 m-auto h-3.5 w-3.5 text-paper opacity-0 transition-opacity peer-checked:opacity-100"
                >
                  <path d="M3.5 8.5l3 3 6-6" />
                </svg>
              </span>
              {room}
            </label>
          ))}
        </div>
      </fieldset>

      <FormField id="timeline" label="When are you hoping to start?">
        {(props) => (
          /* Still a native select, so keyboard, mobile, and screen-reader
             behaviour come for free; only the OS paint is replaced. The
             chevron is a background image rather than a positioned sibling
             so the select stays the label's direct peer and the focus state
             reaches the label. */
          <select
            {...props}
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className={`${props.className} cursor-pointer appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%2345584A' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 7.5l5 5 5-5'/%3E%3C/svg%3E")] bg-[length:1rem_1rem] bg-[right_center] bg-no-repeat pr-8`}
          >
            <option value="">Select a timeframe</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        )}
      </FormField>

      <FormField
        id="message"
        label={
          <>
            Anything else Cindy should know?{' '}
            <span className="text-muted/80">(optional)</span>
          </>
        }
      >
        {(props) => (
          <textarea
            {...props}
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${props.className} resize-none`}
          />
        )}
      </FormField>

      {/* Honeypot, hidden from people and screen readers */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {/* Spam check */}
      {TURNSTILE_SITE_KEY && (
        <Turnstile
          ref={turnstileRef}
          siteKey={TURNSTILE_SITE_KEY}
          onSuccess={setTurnstileToken}
          onExpire={() => setTurnstileToken('')}
        />
      )}

      {/* Error */}
      {status === 'error' && (
        <p role="alert" className="text-sm text-error">
          Something went wrong. Please try sending again or call{' '}
          {site.phoneDisplay} directly.
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={
          status === 'sending' || (!!TURNSTILE_SITE_KEY && !turnstileToken)
        }
        className={`${buttonClasses()} disabled:opacity-60`}
      >
        {status === 'sending' ? 'Sending…' : 'Send your note'}
      </button>
    </form>
  );
}
