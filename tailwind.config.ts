import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F7F4EE',
        // The second band tone. At the old #EFEADF the two bands sat 1.09:1
        // apart, which read as faint banding rather than as grouping. Deepened
        // to 1.28:1, still a warm cream and still quiet.
        surface: '#E2D9C4',
        ink: '#2C2A26',
        // Secondary text. The old #6B6760 reached only 4.01:1 on the surface
        // band, under the 4.5:1 AA floor for normal text, and muted text sits on
        // surface all over the site: the footer fact block, the form labels on
        // the contact panel, every PhotoFrame label. Deepened until it clears AA
        // on BOTH creams (5.04:1 on surface, 6.44:1 on paper) while staying well
        // clear of ink so it still reads as secondary.
        muted: '#5C5851',
        sage: '#5E7461',
        'sage-deep': '#45584A',
        // Deepened with `surface`, not independently. The FAQ dividers are
        // drawn in `line` directly on the band with no card fill under them, so
        // leaving `line` where it was would have sunk them to 1.02:1 and erased
        // them. This holds them at 1.22:1, and hairlines on paper get a welcome
        // lift from 1.31:1 to 1.56:1.
        line: '#CFC5AC',
        // Form-control boundaries. `line` is a decorative hairline and only
        // reaches 1.16:1 on the surface band, well under the 3:1 WCAG 1.4.11
        // needs for a control edge. This warm taupe clears it on both
        // backgrounds: 3.17:1 on surface, 3.46:1 on paper.
        'line-strong': '#8A8275',
        // Form errors only. Warm terracotta-red, AA on paper for normal text.
        error: '#B4432E',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Body settles at 18px with generous line-height for an older audience;
        // leads a touch larger.
        base: ['1.125rem', { lineHeight: '1.7' }],
        lg: ['1.25rem', { lineHeight: '1.6' }],
      },
      borderRadius: {
        // One soft card radius plus a tighter one for fields; buttons stay pill.
        DEFAULT: '0.5rem',
        md: '0.625rem',
        lg: '0.875rem',
        xl: '1.125rem',
      },
      boxShadow: {
        // Quiet, warm (ink-tinted) elevation so surfaces read as crafted, not flat.
        sm: '0 1px 2px rgb(44 42 38 / 0.04), 0 2px 6px -1px rgb(44 42 38 / 0.05)',
        DEFAULT:
          '0 2px 4px -1px rgb(44 42 38 / 0.05), 0 6px 16px -3px rgb(44 42 38 / 0.07)',
        md: '0 4px 8px -2px rgb(44 42 38 / 0.05), 0 12px 28px -6px rgb(44 42 38 / 0.09)',
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
};
export default config;
