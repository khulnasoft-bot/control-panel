import {
  ElementRects,
  Elements,
  UseFloatingOptions,
  UseFloatingReturn,
  UseTransitionStylesProps,
  autoUpdate,
  flip,
  offset,
  size,
  useFloating,
  useMergeRefs,
  useTransitionStyles,
} from '@floating-ui/react';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';

import { Extend } from '../utils/types';

export type UseDropdownProps = Partial<{
  floating: UseFloatingOptions;
  transition: UseTransitionStylesProps;
  offset: number;
  flip: boolean;
  matchReferenceSize: boolean;
}>;

export type UseDropdown = UseFloatingReturn & {
  transition: { styles: React.CSSProperties; isMounted: boolean };
};

export function useDropdown(props: UseDropdownProps = {}): UseDropdown {
  const floating = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [
      props.offset !== undefined && offset(props.offset),
      props.flip && flip(),
      props.matchReferenceSize && size({ apply: applyMatchReferenceSize }),
    ],
    ...props.floating,
  });

  const transition = useTransitionStyles(floating.context, {
    duration: 100,
    ...props.transition,
  });

  return {
    ...floating,
    transition,
  };
}

function applyMatchReferenceSize({ rects, elements }: { rects: ElementRects; elements: Elements }) {
  Object.assign(elements.floating.style, {
    width: `${rects.reference.width}px`,
  });
}

type DropdownProps = Extend<
  React.ComponentProps<'div'>,
  {
    dropdown: ReturnType<typeof useDropdown>;
    onClosed?: () => void;
  }
>;

export function Dropdown({ ref, dropdown, onClosed, style, className, children, ...props }: DropdownProps) {
  const mergedRefs = useMergeRefs([dropdown.refs.setFloating, ref]);

  const onTransitionEnd = () => {
    if (!dropdown.context.open) {
      onClosed?.();
    }
  };

  return (
    <div
      ref={mergedRefs}
      style={{ ...dropdown.floatingStyles, ...dropdown.transition.styles, ...style }}
      className={dropdownClassName({ hidden: !dropdown.transition.isMounted, className })}
      onTransitionEnd={onTransitionEnd}
      // eslint-disable-next-line react/no-unknown-property
      onTransitionCancel={onTransitionEnd}
      {...props}
    >
      {children}
    </div>
  );
}

const dropdownClassName = cva('z-50 rounded-md border bg-popover shadow-md', {
  variants: {
    hidden: {
      true: 'hidden',
    },
  },
});

export function Menu({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul {...props} className={clsx('p-1', className)} />;
}

type MenuItemProps = Extend<
  React.ComponentProps<'li'>,
  {
    highlighted?: boolean;
  }
>;

export function MenuItem({ highlighted, className, ...props }: MenuItemProps) {
  return <li {...props} className={menuItem({ highlighted, className })} />;
}

const menuItem = cva('cursor-pointer rounded-md px-2 py-1 aria-disabled:pointer-events-none', {
  variants: {
    highlighted: {
      true: 'bg-muted',
    },
  },
});
