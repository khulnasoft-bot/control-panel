import clsx from 'clsx';
import { isValidElement } from 'react';

import { Spinner } from '../spinner/spinner';
import { Extend } from '../utils/types';

export type ButtonVariant = 'solid' | 'outline' | 'ghost';
export type ButtonSize = 1 | 2 | 3;
export type ButtonColor = 'green' | 'blue' | 'orange' | 'red' | 'gray';

type ButtonOwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  loading?: boolean;
};

type ButtonProps = Extend<React.ComponentProps<'button'>, ButtonOwnProps>;

export function Button({ loading, children, className, ...props }: ButtonProps) {
  return (
    <button type="button" disabled={loading} className={Button.className(props, className)} {...props}>
      {loading && <Spinner className="size-4" />}
      {children}
    </button>
  );
}

type IconButtonComponentProps = {
  Icon: React.ComponentType<{ className?: string }>;
  icon?: never;
};

type IconButtonNodeProps = {
  Icon?: never;
  icon: React.ReactElement;
};

type IconButtonProps = ButtonProps & (IconButtonComponentProps | IconButtonNodeProps);

export function IconButton({
  variant = 'outline',
  size = 2,
  icon,
  Icon,
  className,
  children,
  ...props
}: IconButtonProps) {
  const getIcon = () => {
    if (isValidElement(icon)) {
      return icon;
    }

    if (Icon !== undefined) {
      return (
        <Icon
          className={clsx({
            'text-dim': variant !== 'solid',
            'size-4': size === 1,
            'size-5': size === 2,
            'size-6': size === 3,
          })}
        />
      );
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={clsx(
        {
          'px-1!': size === 1,
          'px-2!': size === 2,
          'px-3!': size === 3,
        },
        className,
      )}
      {...props}
    >
      {children && <span className="sm:hidden">{children}</span>}
      {getIcon()}
    </Button>
  );
}

Button.className = function (
  { variant = 'solid', size = 2, color = 'green' }: ButtonOwnProps,
  className?: string,
) {
  return clsx(
    'inline-flex items-center justify-center whitespace-nowrap',
    'rounded-md font-medium focusable transition-colors',
    sizeClass(size),
    hoverClass(color),
    focusClass(color),
    variant === 'solid' && solidClass(color),
    variant === 'outline' && outlineClass(color),
    variant === 'ghost' && ghostClass(color),
    className,
  );
};

function sizeClass(size: ButtonSize) {
  return clsx({
    'min-h-6 gap-1 px-2 text-xs': size === 1,
    'min-h-8 gap-2.5 px-3': size === 2,
    'min-h-10 gap-2.5 px-4': size === 3,
  });
}

function hoverClass(color: ButtonColor) {
  return clsx(
    color === 'green' && 'hover:bg-green/90 hover:text-zinc-50',
    color === 'blue' && 'hover:bg-blue/90 hover:text-zinc-50',
    color === 'orange' && 'hover:bg-orange/90 hover:text-zinc-50',
    color === 'red' && 'hover:bg-red/90 hover:text-zinc-50',
    color === 'gray' && 'hover:bg-muted/90',
  );
}

function focusClass(color: ButtonColor) {
  return clsx(
    color === 'green' && 'outline-green/50 focus-visible:bg-green/80',
    color === 'blue' && 'outline-blue/50 focus-visible:bg-blue/80',
    color === 'orange' && 'outline-orange/50 focus-visible:bg-orange/80',
    color === 'red' && 'outline-red/50 focus-visible:bg-red/80',
    color === 'gray' && 'outline-gray focus-visible:bg-muted/80',
  );
}

function solidClass(color: ButtonColor) {
  // prettier-ignore
  return clsx(
    color === 'green' && 'bg-green text-zinc-50 disabled:bg-green/50 dark:disabled:text-zinc-50/50',
    color === 'blue' && 'bg-blue text-zinc-50 disabled:bg-blue/50 dark:disabled:text-zinc-50/50',
    color === 'orange' && 'bg-orange text-zinc-50 disabled:bg-orange/50 dark:disabled:text-zinc-50/50',
    color === 'red' && 'bg-red text-zinc-50 disabled:bg-red/50 dark:disabled:text-zinc-50/50',
    color === 'gray' && 'bg-muted disabled:bg-muted disabled:text-dim',
  );
}

function outlineClass(color: ButtonColor) {
  return clsx(
    'border disabled:border-border disabled:bg-muted disabled:text-dim',
    color === 'green' && 'border-green',
    color === 'blue' && 'border-blue',
    color === 'orange' && 'border-orange',
    color === 'red' && 'border-red',
  );
}

function ghostClass(color: ButtonColor) {
  return clsx(
    'border border-transparent',
    color === 'green' && 'text-green disabled:bg-green/50 disabled:text-zinc-50',
    color === 'blue' && 'text-blue disabled:bg-blue/50 disabled:text-zinc-50',
    color === 'orange' && 'text-orange disabled:bg-orange/50 disabled:text-zinc-50',
    color === 'red' && 'text-red disabled:bg-red/50 disabled:text-zinc-50',
    color === 'gray' && 'disabled:bg-muted disabled:text-dim',
  );
}
