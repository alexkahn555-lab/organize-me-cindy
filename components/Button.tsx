import Link from 'next/link';

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  /** Full-bleed bar, used by the mobile nav overlay. */
  block?: boolean;
  className?: string;
};

// One style site-wide. A soft rectangle, not a pill: every reference render is a
// rectangle, and the pill was the strongest template tell left in the build.
//
// The colour shift is the whole hover. No lift, no scale: this is the most
// repeated element on the site and anything louder wears thin by the third page.
const BASE =
  'inline-flex items-center justify-center rounded-[4px] px-7 py-3 text-sm font-medium transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep';

const VARIANTS = {
  primary: 'bg-sage-deep text-paper hover:bg-sage',
  secondary: 'border border-sage text-sage-deep hover:bg-sage hover:text-paper',
} as const;

export default function Button({
  href,
  children,
  variant = 'primary',
  block = false,
  className,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`${BASE} ${VARIANTS[variant]}${block ? ' w-full' : ''}${
        className ? ` ${className}` : ''
      }`}
    >
      {children}
    </Link>
  );
}

// Exported so the contact form's submit control, which is a <button> and not a
// link, is styled from the same source rather than a copy of these classes.
export const buttonClasses = (variant: keyof typeof VARIANTS = 'primary') =>
  `${BASE} ${VARIANTS[variant]}`;
