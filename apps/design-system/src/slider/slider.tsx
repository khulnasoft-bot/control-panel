import { useRanger } from '@tanstack/react-ranger';
import clsx from 'clsx';
import { useMemo, useRef } from 'react';

import { useFieldId } from '../field/field';
import { mergeRefs } from '../utils/merge-refs';

type SliderProps = {
  ref?: React.Ref<HTMLDivElement>;
  min?: number;
  max?: number;
  step?: number;
  tickSize?: number;
  renderTick?: (value: number) => React.ReactNode;
  connector?: boolean;
  disabled?: boolean;
  value?: number[];
  onChange?: (values: number[]) => void;
};

export function Slider({
  ref,
  min = 0,
  max = 100,
  step = 1,
  tickSize = step,
  renderTick,
  connector,
  disabled,
  value,
  onChange,
}: SliderProps) {
  const id = useFieldId();
  const rangerRef = useRef<HTMLDivElement>(null);

  const ranger = useRanger({
    getRangerElement: () => rangerRef.current,
    values: value ?? [],
    min,
    max,
    stepSize: step,
    tickSize,
    onDrag: ({ sortedValues }) => onChange?.([...sortedValues]),
  });

  return (
    <>
      <div
        ref={mergeRefs(ref, rangerRef)}
        id={id}
        className={clsx('relative h-2 w-full rounded-full bg-inverted/10', {
          'cursor-pointer': !disabled,
          'pointer-events-none opacity-50': disabled,
        })}
      >
        {connector && <Connector steps={ranger.getSteps()} />}

        {ranger.handles().map((handle, i) => (
          <button
            key={i}
            type="button"
            role="slider"
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={handle.onKeyDownHandler}
            onMouseDown={handle.onMouseDownHandler}
            onTouchStart={handle.onTouchStart}
            aria-valuemin={ranger.options.min}
            aria-valuemax={ranger.options.max}
            aria-valuenow={handle.value}
            className="absolute top-1/2 size-4 -translate-1/2 rounded-full bg-inverted"
            style={{ left: `${ranger.getPercentageForValue(handle.value)}%`, zIndex: i === 0 ? 1 : 0 }}
          />
        ))}
      </div>

      {renderTick && <Ticks ticks={ranger.getTicks()} renderTick={renderTick} />}
    </>
  );
}

type ConnectorProps = {
  steps: Array<{ left: number; width: number }>;
};

function Connector({ steps }: ConnectorProps) {
  const step = useMemo(() => {
    if (steps.length === 2) {
      return steps[0];
    }

    if (steps.length === 3) {
      return steps[1];
    }
  }, [steps]);

  if (step === undefined) {
    return;
  }

  return (
    <div
      className="absolute top-1/2 h-full -translate-y-1/2 rounded-full bg-inverted/50"
      style={{ left: `${step.left}%`, width: `${step.width}%` }}
    />
  );
}

type MarksProps = {
  ticks: Array<{ key: number; value: number; percentage: number }>;
  renderTick: (value: number) => React.ReactNode;
};

function Ticks({ ticks, renderTick }: MarksProps) {
  return (
    <div className="relative mt-0.5 h-4 w-full">
      {ticks.map(({ key, value, percentage }) => (
        <span key={key} className="absolute -translate-x-1/2" style={{ left: `${percentage}%` }}>
          {renderTick(value)}
        </span>
      ))}
    </div>
  );
}
