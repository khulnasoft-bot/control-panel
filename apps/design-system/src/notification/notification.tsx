import clsx from 'clsx';
import { AlertCircleIcon, AlertTriangleIcon, CheckIcon, CircleIcon, XIcon } from 'lucide-react';

import { StatusIcon } from '../status-icon/status-icon';

export type NotificationVariant = 'success' | 'info' | 'warning' | 'error';

type NotificationProps = {
  title?: React.ReactNode;
  variant?: NotificationVariant;
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
};

export function Notification({ title, variant = 'info', onClose, className, children }: NotificationProps) {
  return (
    <div
      className={clsx(
        'row items-start gap-3 rounded-sm border bg-popover/90 px-4 py-3 shadow-md backdrop-blur-sm',
        className,
      )}
    >
      <StatusIcon {...icons[variant]} />

      <div className="col gap-1 self-center">
        {title && <div className="text-base font-semibold">{title}</div>}
        {children && <div>{children}</div>}
      </div>

      <button className="ml-auto" onClick={onClose}>
        <XIcon className="size-4" />
      </button>
    </div>
  );
}

const icons: Record<NotificationVariant, React.ComponentProps<typeof StatusIcon>> = {
  success: { color: 'green', Icon: CheckIcon },
  info: { color: 'blue', Icon: CircleIcon },
  warning: { color: 'orange', Icon: AlertTriangleIcon },
  error: { color: 'red', Icon: AlertCircleIcon },
};
