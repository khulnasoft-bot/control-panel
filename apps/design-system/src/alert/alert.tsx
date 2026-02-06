import clsx from 'clsx';
import { AlertCircleIcon, InfoIcon } from 'lucide-react';

import { StatusIcon } from '../status-icon/status-icon';

export type AlertVariant = 'neutral' | 'info' | 'error' | 'warning';
export type AlertStyle = 'solid' | 'outline';

type AlertProps = {
  variant?: AlertVariant;
  style?: AlertStyle;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

export function Alert({
  variant = 'neutral',
  style = 'solid',
  icon,
  title,
  description,
  className,
  children,
}: AlertProps) {
  return (
    <div
      role="alert"
      className={clsx(
        'col items-start gap-3 rounded-lg border px-4 py-3 sm:row sm:items-stretch',
        {
          'border-blue': variant === 'info',
          'border-red': variant === 'error',
          'border-orange': variant === 'warning',
        },
        style === 'solid' && {
          'bg-gray/5': variant === 'neutral',
          'bg-blue/5': variant === 'info',
          'bg-red/5': variant === 'error',
          'bg-orange/5': variant === 'warning',
        },
        className,
      )}
    >
      {icon ?? <StatusIcon {...icons[variant]} className="self-start" />}

      <div className="me-auto col items-start justify-center gap-1">
        {title && <span className="text-base font-medium">{title}</span>}
        {description && <span>{description}</span>}
      </div>

      {children}
    </div>
  );
}

const icons: Record<AlertVariant, React.ComponentProps<typeof StatusIcon>> = {
  neutral: { Icon: InfoIcon, color: 'gray' },
  info: { Icon: InfoIcon, color: 'blue' },
  error: { Icon: AlertCircleIcon, color: 'red' },
  warning: { Icon: AlertCircleIcon, color: 'orange' },
};
