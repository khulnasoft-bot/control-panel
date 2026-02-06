import clsx from 'clsx';

import { useFieldId } from '../field/field';

type RadioProps = React.ComponentProps<'input'>;

export function Radio({ className, ...props }: RadioProps) {
  const id = useFieldId();

  return (
    <>
      <input id={id} type="radio" className="peer sr-only fixed" {...props} />

      <span className={clsx('leading-none peer-checked:hidden peer-disabled:[&>span]:bg-muted', className)}>
        <span className="inline-block size-4 rounded-full border" />
      </span>

      <span className={clsx('hidden leading-none peer-checked:block', className)}>
        <Checked className="size-4" />
      </span>
    </>
  );
}

function Checked(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" {...props}>
      <circle cx="8" cy="8" r="8" className="fill-green" />
      <circle cx="8" cy="8" r="2" className="fill-neutral" />
    </svg>
  );
}
