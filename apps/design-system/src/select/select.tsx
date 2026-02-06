import { useMergeRefs } from '@floating-ui/react';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import * as downshift from 'downshift';
import { ChevronDown } from 'lucide-react';

import { UseDropdown } from '../dropdown/dropdown';
import { useFieldId } from '../field/field';
import { Extend } from '../utils/types';

type SelectToggleButtonProps<T> = Extend<
  React.ComponentProps<'div'>,
  {
    select: downshift.UseSelectReturnValue<T>;
    dropdown: UseDropdown;
    size?: 1 | 2 | 3;
    placeholder?: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
    readOnly?: boolean;
    invalid?: boolean;
  }
>;

export function SelectToggleButton<T>(props: SelectToggleButtonProps<T>) {
  const {
    select,
    dropdown,
    ref,
    size,
    placeholder,
    icon,
    disabled,
    readOnly,
    invalid,
    className,
    children,
    ...rest
  } = props;

  const mergedRefs = useMergeRefs([dropdown.refs.setReference, ref]);
  const id = useFieldId();

  return (
    <div
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      {...select.getToggleButtonProps({ ref: mergedRefs, disabled: disabled || readOnly, ...rest })}
      aria-disabled={disabled ? true : undefined}
      aria-readonly={readOnly ? true : undefined}
      aria-invalid={invalid ? true : undefined}
      aria-errormessage={invalid ? `${id}-helper-text` : undefined}
      className={toggleButton({ size, disabled, invalid, className })}
    >
      <div className="grow">
        {children ??
          (placeholder && (
            <div className="text-placeholder in-aria-disabled:text-placeholder/50!">{placeholder}</div>
          ))}
      </div>

      {icon ?? (
        <div>
          <ChevronDown className={clsx('size-4', select.isOpen && '-scale-y-100')} />
        </div>
      )}
    </div>
  );
}

const toggleButton = cva(
  [
    'row w-full items-center gap-2',
    'rounded-sm border -outline-offset-1 transition-colors duration-100',
    'cursor-pointer focus:focused',
  ],
  {
    variants: {
      size: {
        1: 'min-h-6 px-1.5',
        2: 'min-h-8 px-2',
        3: 'min-h-10 px-3',
      },
      disabled: {
        true: 'pointer-events-none bg-muted/50 text-dim/50 outline-none',
        false: 'bg-neutral',
      },
      invalid: {
        true: 'border-red outline-red',
      },
    },
    defaultVariants: {
      size: 2,
      disabled: false,
    },
  },
);
