// The site's one rule. `line` is the resting hairline; `sage` at 2px is the
// active state (a hovered service row, the underline under a current nav link,
// the ornament above the contact success message). Height changes are done with
// a border, not a margin, so a row's rule can thicken without shifting the row.

interface HairlineProps {
  /** `active` is the 2px sage rule; `sage` is a 1px sage keyline. */
  tone?: 'line' | 'sage' | 'active';
  className?: string;
}

const tones = {
  line: 'border-t border-line',
  sage: 'border-t border-sage',
  active: 'border-t-2 border-sage',
} as const;

export default function Hairline({ tone = 'line', className }: HairlineProps) {
  return (
    <hr
      aria-hidden="true"
      className={`w-full ${tones[tone]}${className ? ` ${className}` : ''}`}
    />
  );
}
