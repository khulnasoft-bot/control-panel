import { Meta } from '@storybook/react-vite';
import clsx from 'clsx';

export default {
  title: 'Theme',
} satisfies Meta;

export function Theme() {
  return (
    <>
      <div className="col gap-1">
        <h2 className="mt-4 mb-2 text-lg font-semibold">Colors</h2>
        <Color label="neutral" className="border bg-neutral" />
        <Color label="inverted" className="bg-inverted" />
        <Color label="red" className="bg-red" />
        <Color label="green" className="bg-green" />
        <Color label="blue" className="bg-blue" />
        <Color label="orange" className="bg-orange" />
        <Color label="gray" className="bg-gray" />
        <Color label="muted" className="bg-muted" />
        <Color label="popover" className="border bg-popover dark:border-0" />
      </div>

      <div className="col gap-1">
        <h2 className="mt-4 mb-2 text-lg font-semibold">Border colors</h2>
        <Color label="default" className="border" />
      </div>

      <div className="col gap-1">
        <h2 className="mt-4 mb-2 text-lg font-semibold">Text colors</h2>
        <Text label="default" className="text-default" />
        <Text label="dim" className="text-dim" />
        <Text label="red" className="text-red" />
        <Text label="green" className="text-green" />
        <Text label="blue" className="text-blue" />
        <Text label="orange" className="text-orange" />
        <Text label="gray" className="text-gray" />
        <Text label="placeholder" className="text-placeholder" />
      </div>

      <div className="col gap-1">
        <h2 className="mt-4 mb-2 text-lg font-semibold">Fonts</h2>
        <Font label="sans" className="font-sans" />
        <Font label="mono" className="font-mono" />
      </div>
    </>
  );
}

function Color({ className, label }: { className: string; label: React.ReactNode }) {
  return (
    <div className="row items-center gap-2">
      <div className={clsx('size-6 rounded-sm', className)}></div>
      {label}
    </div>
  );
}

function Text({ className, label }: { className: string; label: React.ReactNode }) {
  return (
    <div className="row items-center gap-2">
      <div className={className}>Text</div>
      {label}
    </div>
  );
}

function Font({ className, label }: { className: string; label: React.ReactNode }) {
  return (
    <div className="row items-center gap-2">
      <div className={clsx('min-w-64', className)}>
        <div>abcdefghijklmnopqrstuvwxyz</div>
        <div>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
        <div>0123456789</div>
      </div>
      {label}
    </div>
  );
}
