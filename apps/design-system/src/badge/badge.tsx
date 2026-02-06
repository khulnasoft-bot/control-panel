import clsx from 'clsx';

import { Extend } from '../utils/types';

export type BadgeSize = 1 | 2;
export type BadgeColor = 'red' | 'green' | 'blue' | 'orange' | 'gray';

type BadgeOwnProps = {
  size?: BadgeSize;
  color?: BadgeColor;
};

type BadgeProps = Extend<React.ComponentProps<'span'>, BadgeOwnProps>;

export function Badge({ size = 2, color = 'gray', className, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        'rounded-md text-center font-medium',
        {
          'px-2 py-0.5 text-xs': size === 1,
          'px-3 py-1': size === 2,
        },
        {
          'bg-red/10 text-red': color === 'red',
          'bg-green/10 text-green': color === 'green',
          'bg-blue/10 text-blue': color === 'blue',
          'bg-orange/10 text-orange': color === 'orange',
          'bg-gray/10 text-dim': color === 'gray',
        },
        className,
      )}
      {...props}
    />
  );
}
