import type { Meta, StoryFn } from '@storybook/react-vite';
import { BoxIcon } from 'lucide-react';

import { controls } from '../utils/storybook';
import { StatusIcon, StatusIconColor } from './status-icon';

type Args = {
  color: StatusIconColor;
};

export default {
  title: 'DesignSystem/StatusIcon',
  args: {
    color: 'green',
  },
  argTypes: {
    color: controls.inlineRadio(['red', 'green', 'blue', 'orange', 'gray']),
  },
} satisfies Meta<Args>;

export const statusIcon: StoryFn<Args> = ({ color }) => {
  return <StatusIcon color={color} Icon={BoxIcon} />;
};
