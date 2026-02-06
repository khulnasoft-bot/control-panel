import { useState } from 'react';
import { createPortal } from 'react-dom';

import LogoKhulnaSoft from 'src/components/logo-khulnasoft.svg?react';
import { useMount } from 'src/hooks/lifecycle';

export function LogoLoading() {
  const [show, setShow] = useState(false);

  useMount(() => {
    const timeout = setTimeout(() => setShow(true), 500);

    return () => {
      clearTimeout(timeout);
    };
  });

  if (!show) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 col items-center justify-center bg-neutral">
      <LogoKhulnaSoft className="max-h-24 animate-pulse" />
    </div>,
    document.getElementById('root') as HTMLElement,
  );
}
