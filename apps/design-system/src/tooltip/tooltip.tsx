import { FloatingArrow, FloatingPortal } from '@floating-ui/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState } from 'react';

import { Backdrop } from '../backdrop/backdrop';
import { useBreakpoint } from '../utils/media-query';
import { UseTooltipProps, useTooltip } from './use-tooltip';

type TooltipOwnProps = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  forceDesktop?: boolean;
  root?: HTMLElement | null;
  className?: string;
  content?: ({ onClose }: { onClose: () => void }) => React.ReactNode;
  trigger: (props: Record<string, unknown>) => React.ReactNode;
};

type TooltipProps = Omit<UseTooltipProps, 'open' | 'setOpen'> & TooltipOwnProps;

export function Tooltip({ content, trigger, ...props }: TooltipProps) {
  const [open, setOpen] = useState(false);

  const tooltip = useTooltip({
    open,
    setOpen,
    ...props,
  });

  return (
    <>
      {trigger(tooltip.interactions.getReferenceProps({ ref: tooltip.floating.refs.setReference }))}

      {content && (
        <TooltipElement tooltip={tooltip} {...props}>
          {content({ onClose: () => tooltip.floating.context.onOpenChange(false) })}
        </TooltipElement>
      )}
    </>
  );
}

type TooltipElementProps = {
  tooltip: ReturnType<typeof useTooltip>;
  root?: HTMLElement | null;
  forceDesktop?: boolean;
  className?: string;
  children: React.ReactNode;
};

function TooltipElement(props: TooltipElementProps) {
  const { tooltip, forceDesktop, children } = props;
  const { floating, transition, arrow, setArrow } = tooltip;

  const mobile = !useBreakpoint('sm');
  const Container = mobile && !forceDesktop ? ContainerMobile : ContainerDesktop;

  if (!transition.isMounted) {
    return null;
  }

  return (
    <Container {...props}>
      {children}

      {arrow && (
        <FloatingArrow
          ref={setArrow}
          context={floating.context}
          height={arrow.size}
          className="fill-neutral"
        />
      )}
    </Container>
  );
}

function ContainerMobile(props: TooltipElementProps) {
  const { tooltip, root, className, children } = props;
  const { floating, interactions } = tooltip;

  return (
    <Backdrop
      context={floating.context}
      root={root}
      className="z-40 overflow-hidden! bg-black/5 p-2 backdrop-blur-xs"
    >
      <motion.div
        initial={{ transform: 'translateY(100%)' }}
        animate={{ transform: 'translateY(0)' }}
        exit={{ transform: 'translateY(100%)' }}
        className={clsx('absolute inset-x-0 bottom-0 rounded-t-2xl bg-neutral p-4', className)}
        {...interactions.getFloatingProps({ ref: floating.refs.setFloating })}
      >
        {children}
      </motion.div>
    </Backdrop>
  );
}

function ContainerDesktop(props: TooltipElementProps) {
  const { tooltip, root, className, children } = props;
  const { floating, transition, interactions } = tooltip;

  return (
    <FloatingPortal root={root}>
      <div
        className={clsx('z-50 rounded-md border bg-neutral p-3 drop-shadow-md', className)}
        style={{ ...floating.floatingStyles, ...transition.styles }}
        {...interactions.getFloatingProps({ ref: floating.refs.setFloating })}
      >
        {children}
      </div>
    </FloatingPortal>
  );
}

export function TooltipTitle({ title }: { title: React.ReactNode }) {
  return <div className="text-base font-bold md:text-xs md:text-dim md:uppercase">{title}</div>;
}
