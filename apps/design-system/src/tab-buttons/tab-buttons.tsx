import { cva } from 'class-variance-authority';

import { Extend } from '../utils/types';

export type TabButtonSize = 1 | 2;

type TabButtonsProps = {
  size?: TabButtonSize;
  className?: string;
  children?: React.ReactNode;
};

export function TabButtons({ size = 2, className, children }: TabButtonsProps) {
  return (
    <div className="max-w-full overflow-x-auto">
      <div role="tablist" className={TabButtons.className({ size, className })}>
        {children}
      </div>
    </div>
  );
}

TabButtons.className = cva('row w-fit gap-2 rounded-md bg-muted p-1', {
  variants: {
    size: {
      1: 'h-8',
      2: 'h-10',
    },
  },
});

type TabButtonProps = Extend<
  React.ComponentProps<'button'>,
  {
    size?: 1 | 2;
    selected?: boolean;
    className?: string;
  }
>;

export function TabButton({ size, selected, className, ...props }: TabButtonProps) {
  return (
    <button
      type="button"
      role="tab"
      className={TabButton.className({ size, className })}
      data-status={selected ? 'active' : 'inactive'}
      {...props}
    />
  );
}

TabButton.className = cva(
  [
    'col h-full flex-1 items-center justify-center',
    'rounded-sm px-3 whitespace-nowrap focusable transition-all',
    'aria-disabled:pointer-events-none aria-disabled:opacity-50',
    [
      'data-[status=inactive]:text-dim data-[status=inactive]:hover:bg-neutral/50 data-[status=inactive]:hover:text-default',
      'data-[status=active]:bg-neutral',
    ],
  ],
  {
    variants: {
      size: {
        1: 'text-xs',
        2: 'font-medium',
      },
    },
  },
);
