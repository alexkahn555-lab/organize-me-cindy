import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

// Edge runtime: @vercel/og's Node bundle fails to statically prerender on
// Windows (Invalid URL in fileURLToPath). The edge bundle renders at request
// time and does not hit that code path.
export const runtime = 'edge';

export const alt = `${site.wordmark}, professional organizing across ${site.serviceArea}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Hex values mirror the sage-deep and paper tokens in tailwind.config.ts.
const SAGE_DEEP = '#45584A';
const PAPER = '#F7F4EE';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: SAGE_DEEP,
          color: PAPER,
        }}
      >
        <div style={{ display: 'flex', fontSize: 96, fontWeight: 600 }}>
          {site.wordmark}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 28,
            fontSize: 36,
            opacity: 0.9,
          }}
        >
          Professional organizing across {site.serviceArea}
        </div>
      </div>
    ),
    size,
  );
}
