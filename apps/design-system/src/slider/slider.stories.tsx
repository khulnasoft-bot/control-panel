import type { Meta, StoryFn } from '@storybook/react-vite';
import { useState } from 'react';

import { controls } from '../utils/storybook';
import { Slider } from './slider';

type Args = {
  min: number;
  max: number;
  step: number;
  range: boolean;
  connector: boolean;
  disabled: boolean;
};

export default {
  title: 'DesignSystem/Slider',
  args: {
    range: false,
    min: 0,
    max: 8,
    step: 1,
    connector: true,
  },
  argTypes: {
    disabled: controls.boolean(),
  },
} satisfies Meta<Args>;

export const slider: StoryFn<Args> = ({ range, ...args }) => {
  const [min, setMin] = useState(2);
  const [max, setMax] = useState(5);

  return (
    <Slider
      {...args}
      value={range ? [min, max] : [max]}
      onChange={([min, max]) => {
        if (range) {
          setMin(min);
          setMax(max);
        } else {
          setMin(0);
          setMax(min);
        }
      }}
      renderTick={(value) => <div className="mt-2">{value}</div>}
    />
  );
};
