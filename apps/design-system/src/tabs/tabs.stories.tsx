import type { Meta, StoryFn } from '@storybook/react-vite';
import { useState } from 'react';

import { Tab, Tabs } from './tabs';

export default {
  title: 'DesignSystem/Tabs',
} satisfies Meta;

export const tabs: StoryFn = () => {
  const [selected, setSelected] = useState(1);

  return (
    <Tabs>
      <Tab selected={selected === 1} onClick={() => setSelected(1)}>
        Tab 1
      </Tab>
      <Tab selected={selected === 2} onClick={() => setSelected(2)}>
        Tab 2
      </Tab>
      <Tab selected={selected === 3} onClick={() => setSelected(3)}>
        Tab 3
      </Tab>
    </Tabs>
  );
};
