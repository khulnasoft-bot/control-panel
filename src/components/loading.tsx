import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { Spinner } from '@snipkit/design-system';

const debounce = 300;

export function Loading({ className, children, ...props }: React.ComponentProps<'div'>) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, debounce);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (children) {
    return <>{show ? children : null}</>;
  }

  return (
    <div className={clsx('row min-h-32 items-center justify-center', className)} {...props}>
      {show ? <Spinner className="size-6" /> : null}
    </div>
  );
}
