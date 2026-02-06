import type { Meta, StoryFn } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { controls } from '../utils/storybook';
import { Notification, NotificationVariant } from './notification';

type Args = {
  variant: NotificationVariant;
  title?: string;
  content: string;
};

export default {
  title: 'DesignSystem/Notification',
  args: {
    variant: 'info',
    content: 'Description, lorem ipsum dolor sit...',
  },
  argTypes: {
    title: controls.string(),
    variant: controls.inlineRadio(['success', 'info', 'warning', 'error']),
  },
} satisfies Meta<Args>;

export const notification: StoryFn<Args> = ({ variant, title, content }) => {
  return (
    <Notification variant={variant} title={title} onClose={action('close')} className="max-w-sm">
      {content}
    </Notification>
  );
};
