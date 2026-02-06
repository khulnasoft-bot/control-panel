import clsx from 'clsx';

import { useFieldId } from '../field/field';
import { Extend } from '../utils/types';

type CheckboxProps = Extend<
  React.ComponentProps<'input'>,
  {
    indeterminate?: boolean;
  }
>;

export function Checkbox({ indeterminate, className, ...props }: CheckboxProps) {
  const id = useFieldId();

  return (
    <>
      <input id={id} type="checkbox" className="peer sr-only fixed" {...props} />

      <span className={clsx('group leading-none peer-checked:hidden', className)}>
        <Unchecked className="size-4" />
      </span>

      <span className={clsx('hidden leading-none peer-checked:block', className)}>
        {indeterminate ? <Indeterminate className="size-4" /> : <Checked className="size-4" />}
      </span>
    </>
  );
}

function Unchecked(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" {...props}>
      <path
        strokeWidth={1}
        className="fill-neutral stroke-border group-peer-disabled:fill-muted"
        d="M4 0.5H12C13.933 0.5 15.5 2.067 15.5 4V12C15.5 13.933 13.933 15.5 12 15.5H4C2.067 15.5 0.5 13.933 0.5 12V4C0.5 2.067 2.067 0.5 4 0.5Z"
      />
    </svg>
  );
}

function Checked(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" {...props}>
      <path
        className="fill-green"
        d="M4 0.5H12C13.933 0.5 15.5 2.067 15.5 4V12C15.5 13.933 13.933 15.5 12 15.5H4C2.067 15.5 0.5 13.933 0.5 12V4C0.5 2.067 2.067 0.5 4 0.5Z"
      />
      <path
        className="stroke-neutral"
        d="M12 5L6.5 10.5L4 8"
        fill="none"
        strokeWidth="1.6666"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Indeterminate(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M4 0.5H12C13.933 0.5 15.5 2.067 15.5 4V12C15.5 13.933 13.933 15.5 12 15.5H4C2.067 15.5 0.5 13.933 0.5 12V4C0.5 2.067 2.067 0.5 4 0.5Z"
        fill="#059669"
        fillOpacity="0.1"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.33337 8.00013C5.33337 7.70558 5.57216 7.4668 5.86671 7.4668H10.1334C10.4279 7.4668 10.6667 7.70558 10.6667 8.00013C10.6667 8.29468 10.4279 8.53346 10.1334 8.53346H5.86671C5.57216 8.53346 5.33337 8.29468 5.33337 8.00013Z"
        fill="#059669"
      />
      <path
        d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H12C13.933 0.5 15.5 2.067 15.5 4V12C15.5 13.933 13.933 15.5 12 15.5H4C2.067 15.5 0.5 13.933 0.5 12V4Z"
        stroke="#059669"
      />
    </svg>
  );
}
