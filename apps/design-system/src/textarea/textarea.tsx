import { cva } from 'class-variance-authority';

import { useFieldId } from '../field/field';
import { Extend } from '../utils/types';

type TextAreaProps = Extend<
  React.ComponentProps<'textarea'>,
  {
    invalid?: boolean;
  }
>;

export function TextArea({ disabled, readOnly, invalid, className, ...props }: TextAreaProps) {
  const id = useFieldId();

  return (
    <textarea
      id={id}
      disabled={disabled}
      readOnly={readOnly}
      aria-invalid={invalid ? true : undefined}
      aria-errormessage={invalid ? `${id}-helper-text` : undefined}
      className={textArea({ disabled, readOnly, invalid, className })}
      {...props}
    />
  );
}
const textArea = cva(
  [
    'w-full rounded-sm border bg-neutral px-2 py-1.5 focusable -outline-offset-1',
    'placeholder:text-placeholder',
    'disabled:opacity-50',
  ],
  {
    variants: {
      disabled: {
        true: 'pointer-events-none bg-muted',
      },
      readOnly: {
        true: 'pointer-events-none',
      },
      invalid: {
        true: 'border-red outline-red',
      },
    },
  },
);
