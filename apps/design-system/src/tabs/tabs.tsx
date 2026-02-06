import clsx from 'clsx';

import { Extend } from '../utils/types';

type TabsProps = React.ComponentProps<'div'>;

export function Tabs({ className, ...props }: TabsProps) {
  return (
    <nav
      role="tablist"
      className={clsx('row hide-scrollbars flex-nowrap overflow-x-auto border-b', className)}
      {...props}
    />
  );
}

type TabProps = Extend<
  React.ComponentProps<'button'>,
  {
    selected?: boolean;
  }
>;

export function Tab({ selected, className, ...props }: TabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      className={clsx(
        'inline-block border-b-2 px-4 py-2 font-semibold whitespace-nowrap transition-colors outline-none focus-visible:bg-green/10',
        'not-aria-selected:border-transparent not-aria-selected:text-dim aria-selected:border-green',
        className,
      )}
      {...props}
    />
  );
}
