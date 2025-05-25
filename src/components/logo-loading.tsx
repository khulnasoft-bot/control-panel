import { createPortal } from 'react-dom';

import LogoSnipkit from 'src/components/logo-snipkit.svg?react';

export function LogoLoading() {
  return createPortal(
    <div className="col fixed inset-0 z-60 items-center justify-center bg-neutral">
      <LogoSnipkit className="max-h-24 animate-pulse" />
    </div>,
    document.getElementById('root') as HTMLElement,
  );
}
