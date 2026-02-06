import { Placement } from '@floating-ui/react';
import type { Meta, StoryFn } from '@storybook/react-vite';

import { Button } from '../button/button';
import { controls } from '../utils/storybook';
import { Tooltip, TooltipTitle } from './tooltip';

type Args = {
  title?: string;
  content: string;
  placement: Placement;
  open?: boolean;
  arrow?: boolean;
  allowHover?: boolean;
  forceDesktop?: boolean;
};

export default {
  title: 'DesignSystem/Tooltip',
  parameters: {
    layout: 'centered',
  },
  args: {
    content: 'This is a tooltip',
    placement: 'top',
  },
  argTypes: {
    title: controls.string(),
    placement: controls.inlineRadio<Placement>(['top', 'left', 'right', 'bottom']),
    open: controls.boolean(),
    arrow: controls.boolean(),
    allowHover: controls.boolean(),
    forceDesktop: controls.boolean(),
  },
} satisfies Meta<Args>;

export const tooltip: StoryFn<Args> = ({ title, content, ...args }) => {
  return (
    <Tooltip
      {...args}
      trigger={(props) => <div className="size-24 rounded-sm bg-inverted/25 font-semibold" {...props} />}
      content={({ onClose }) => (
        <div className="col gap-3">
          {title && <TooltipTitle title={title} />}

          {content}

          <Button onClick={onClose} className="my-6 w-full sm:hidden">
            Close
          </Button>
        </div>
      )}
    />
  );
};
