import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  FloatingRootContext,
} from '@floating-ui/react';
import { AnimatePresence, motion } from 'framer-motion';

const MotionFloatingOverlay = motion.create(FloatingOverlay);
const duration = 140;

type BackdropProps = {
  onClosed?: () => void;
  context: FloatingRootContext;
  root?: HTMLElement | null;
  className?: string;
  children: React.ReactElement;
};

export function Backdrop({ onClosed, context, root, className, children }: BackdropProps) {
  return (
    <AnimatePresence onExitComplete={onClosed}>
      {context.open && (
        <FloatingPortal root={root}>
          <MotionFloatingOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration / 1000 }}
            lockScroll
            className={className}
          >
            <FloatingFocusManager context={context} initialFocus={-1}>
              {children}
            </FloatingFocusManager>
          </MotionFloatingOverlay>
        </FloatingPortal>
      )}
    </AnimatePresence>
  );
}
