import clsx from 'clsx';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';

const hidden = { opacity: 0.5, height: 0 };
const visible = { opacity: 1, height: 'auto' };

type CollapseProps = {
  open: boolean;
  keepMounted?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Collapse({ open, keepMounted, className, children }: CollapseProps) {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence initial={false}>
        {(open || keepMounted) && (
          <m.div
            initial={hidden}
            animate={open ? visible : hidden}
            exit={hidden}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={clsx('overflow-hidden', className)}
          >
            {children}
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
