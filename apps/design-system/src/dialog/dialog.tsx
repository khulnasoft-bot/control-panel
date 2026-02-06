import { useDismiss, useFloating, useInteractions, useRole } from '@floating-ui/react';
import clsx from 'clsx';
import { XIcon } from 'lucide-react';

import { Backdrop } from '../backdrop/backdrop';

type DialogProps = {
  open: boolean;
  onClose?: () => void;
  onClosed?: () => void;
  root?: HTMLElement;
  overlayClassName?: string;
  className?: string;
  children: React.ReactNode | ((props: Record<string, unknown>) => React.ReactElement);
};

export function Dialog({
  open,
  onClose,
  onClosed,
  root,
  overlayClassName,
  className,
  children,
}: DialogProps) {
  const { refs, context } = useFloating({
    open: open,
    onOpenChange(open) {
      if (!open) {
        onClose?.();
      }
    },
  });

  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });
  const role = useRole(context, { role: 'dialog' });

  const { getFloatingProps } = useInteractions([dismiss, role]);

  const content = () => {
    if (typeof children === 'function') {
      return children({ ref: refs.setFloating, ...getFloatingProps() });
    }

    return (
      <div
        ref={refs.setFloating}
        className={clsx(
          'max-h-full overflow-y-auto rounded-lg bg-popover p-8 text-zinc-950 shadow-lg dark:border dark:text-zinc-50',
          className,
        )}
        {...getFloatingProps()}
      >
        {children}
      </div>
    );
  };

  return (
    <Backdrop
      onClosed={onClosed}
      context={context}
      root={root}
      className={clsx(
        'z-40 flex items-center justify-center bg-black/5 p-2 backdrop-blur-md',
        overlayClassName,
      )}
    >
      {content()}
    </Backdrop>
  );
}

type DialogHeaderProps = {
  title: React.ReactNode;
  onClose?: () => void;
};

export function DialogHeader({ title, onClose }: DialogHeaderProps) {
  return (
    <header className="row items-center justify-between gap-4">
      <h2 className="text-2xl font-semibold">{title}</h2>

      <button type="button" className={clsx('rounded-sm focusable', !onClose && 'hidden')} onClick={onClose}>
        <XIcon className="size-4" />
      </button>
    </header>
  );
}

export function DialogFooter({ className, children }: { className?: string; children: React.ReactNode }) {
  return <footer className={clsx('mt-2 row items-center justify-end gap-2', className)}>{children}</footer>;
}
