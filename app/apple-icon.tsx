import { ImageResponse } from 'next/og';

// Edge runtime: see app/opengraph-image.tsx for why.
export const runtime = 'edge';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// Same generated mark as app/icon.tsx at Apple touch-icon size. iOS applies its
// own corner mask, so the tile stays a full square here.
export default function AppleIcon() {
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
          fontSize: 84,
          fontWeight: 700,
        }}
      >
        OM
      </div>
    ),
    size,
  );
}
