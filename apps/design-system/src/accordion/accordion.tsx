import clsx from 'clsx';
import { ChevronRightIcon } from 'lucide-react';

import { Collapse } from '../collapse/collapse';

type AccordionSectionProps = {
  isExpanded: boolean;
  keepMounted?: boolean;
  hasError?: boolean;
  header?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

export function AccordionSection({
  isExpanded,
  keepMounted,
  hasError,
  header,
  className,
  children,
}: AccordionSectionProps) {
  return (
    <section
      data-expanded={isExpanded}
      data-error={hasError}
      className={clsx(
        'group border-t transition-colors first-of-type:border-none',
        'data-[expanded=true]:border-t-zinc-400 [[data-expanded=true]+&]:border-t-zinc-400',
        'data-[error=true]:border-t-red! [[data-error=true]+&]:border-t-red!',
        className,
      )}
    >
      {header}

      <Collapse open={isExpanded} keepMounted={keepMounted}>
        {children}
      </Collapse>
    </section>
  );
}

type AccordionHeaderProps = {
  expanded: boolean;
  hasError?: boolean;
  setExpanded?: (expanded: boolean) => void;
  className?: string;
  children: React.ReactNode;
};

export function AccordionHeader({
  expanded,
  hasError,
  setExpanded,
  className,
  children,
}: AccordionHeaderProps) {
  return (
    <header
      onClick={() => setExpanded?.(!expanded)}
      className={clsx(
        'row items-center gap-2 px-3 py-4',
        setExpanded !== undefined && 'cursor-pointer',
        expanded && 'bg-linear-to-b from-inverted/5 to-inverted/0',
        hasError && 'bg-linear-to-b from-red/10 to-red/0',
        className,
      )}
    >
      <div>
        <ChevronRightIcon className={clsx('size-4 transition-transform', expanded && 'rotate-90')} />
      </div>
      {children}
    </header>
  );
}
