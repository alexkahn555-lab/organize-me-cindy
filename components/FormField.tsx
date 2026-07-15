import type { ReactNode } from 'react';

// Underline fields, never boxed inputs.
//
// The label sits above the control in the layout but AFTER it in the DOM, with
// flex-col-reverse putting it back on top. That is what lets the label react to
// the control's focus with a CSS peer selector: `peer-focus` only reaches later
// siblings, so a label written before the input could not turn sage without
// JavaScript.
//
// Focus draws a 2px sage-deep rule without moving anything: the border stays at
// 1px and a 1px box-shadow sits directly under it, so the field does not jump by
// a pixel when it gains focus.

const CONTROL =
  'peer w-full border-b border-line-strong bg-transparent px-0 py-2.5 text-lg text-ink outline-none transition-colors duration-150 placeholder:text-muted/70 focus:border-sage-deep focus:shadow-[0_1px_0_0_theme(colors.sage-deep)]';

const LABEL =
  'mb-1 block text-sm text-muted transition-colors duration-150 peer-focus:text-sage';

interface FormFieldProps {
  id: string;
  label: ReactNode;
  /** Renders the control. Spread `props` onto the input, textarea, or select. */
  children: (props: { id: string; className: string }) => ReactNode;
  error?: string;
  className?: string;
}

export default function FormField({
  id,
  label,
  children,
  error,
  className,
}: FormFieldProps) {
  return (
    <div className={className}>
      {/* The control is FIRST in the DOM and the label second; flex-col-reverse
          puts the label back on top visually. That order is what makes
          `peer-focus` reach the label at all: the sibling combinator only looks
          forward, so a label written before its input can never react to it. */}
      <div className="flex flex-col-reverse">
        {children({ id, className: CONTROL })}
        <label htmlFor={id} className={LABEL}>
          {label}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}

// The checkbox and select keep their native controls; only the paint changes.
export const checkboxClasses =
  'peer h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-[2px] border border-line-strong bg-transparent transition-colors checked:border-sage-deep checked:bg-sage-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-deep';

export const fieldClasses = CONTROL;

// The required marker, so every field spells it the same way.
export function Required() {
  return (
    <span aria-hidden="true" className="text-sage-deep">
      {' '}
      *
    </span>
  );
}
