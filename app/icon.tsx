import { ImageResponse } from 'next/og';

// Edge runtime: see app/opengraph-image.tsx for why.
export const runtime = 'edge';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// Wordmark initials in the sage-deep/paper palette. The recovered favicons
// (cindy_favicon2, cindy_apple_favicon1) carry the old near-black script
// identity, so we generate a new mark that matches the rebrand instead.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#45584A',
          color: '#F7F4EE',
          fontSize: 16,
          fontWeight: 700,
          borderRadius: 6,
        }}
      >
        OM
      </div>
    ),
    size,
  );
}
