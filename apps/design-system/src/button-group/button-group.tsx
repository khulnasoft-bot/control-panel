import clsx from 'clsx';

type ButtonGroupProps = React.ComponentProps<'div'>;

export function ButtonGroup({ className, ...props }: ButtonGroupProps) {
  return (
    <div
      className={clsx(
        'row items-stretch divide-x divide-gray/20 dark:divide-gray/80',
        '*:rounded-none',
        '*:border-gray/20 *:dark:border-gray/80',
        '[&>*:first-of-type]:rounded-l-lg',
        '[&>*:last-of-type]:rounded-r-lg [&>*:last-of-type]:border-r!',
        className,
      )}
      {...props}
    />
  );
}
