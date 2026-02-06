import type { Meta, StoryFn } from '@storybook/react-vite';
import { useState } from 'react';

import { controls } from '../utils/storybook';
import { TabButton, TabButtonSize, TabButtons } from './tab-buttons';

type Args = {
  size: TabButtonSize;
};

export default {
  title: 'DesignSystem/TabButtons',
  args: {
    size: 2,
  },
  argTypes: {
    size: controls.inlineRadio([1, 2]),
  },
} satisfies Meta<Args>;

export const tabButtons: StoryFn<Args> = ({ size }) => {
  const [selected, setSelected] = useState(2);

  return (
    <TabButtons size={size} className="max-w-sm">
      <TabButton size={size} selected={selected === 1} onClick={() => setSelected(1)}>
        Tab 1
      </TabButton>

      <TabButton size={size} selected={selected === 2} onClick={() => setSelected(2)}>
        Tab 2
      </TabButton>

      <TabButton size={size} selected={selected === 3} onClick={() => setSelected(3)}>
        Tab 3
      </TabButton>
    </TabButtons>
  );
};
