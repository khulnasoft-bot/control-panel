import clsx from 'clsx';
import { createContext, use } from 'react';

import { useId } from '../utils/use-id';

const fieldIdContext = createContext<string | undefined>(undefined);

export function useFieldId() {
  return use(fieldIdContext);
}

type FieldProps = {
  ref?: React.Ref<HTMLDivElement>;
  id?: string;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export function Field({ ref, id: idProp, label, helperText, className, children }: FieldProps) {
  const id = useId(idProp);

  return (
    <fieldIdContext.Provider value={id}>
      <div ref={ref} className={clsx('col items-start gap-y-1.5', className)}>
        {label}
        {children}
        {helperText}
      </div>
    </fieldIdContext.Provider>
  );
}

type InlineFieldProps = {
  ref?: React.Ref<HTMLLabelElement>;
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export function InlineField({ id: idProp, className, ...props }: InlineFieldProps) {
  const id = useId(idProp);

  return (
    <fieldIdContext.Provider value={id}>
      <FieldLabel
        className={clsx(
          'inline-flex cursor-pointer flex-row items-center gap-2 rounded-sm focusable-within outline-offset-4 has-disabled:pointer-events-none',
          className,
        )}
        {...props}
      />
    </fieldIdContext.Provider>
  );
}

type FieldLabelProps = React.ComponentProps<'label'>;

export function FieldLabel(props: FieldLabelProps) {
  const id = useFieldId();

  if (!props.children) {
    return null;
  }

  return <label htmlFor={id} {...props} />;
}

type FieldHelperTextProps = React.ComponentProps<'span'> & {
  invalid?: boolean;
};

export function FieldHelperText({ invalid, className, children, ...props }: FieldHelperTextProps) {
  const fieldId = useFieldId();

  if (!children) {
    return null;
  }

  return (
    <span
      id={`${fieldId}-helper-text`}
      className={clsx('col-span-2 text-xs', invalid ? 'text-red' : 'text-dim', className)}
      {...props}
    >
      {children}
    </span>
  );
}
