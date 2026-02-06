import type { Meta, StoryFn } from '@storybook/react-vite';

import { ComponentPlaceholder } from '../utils/storybook';

export default {
  title: 'DesignSystem/Card',
} satisfies Meta;

export const card: StoryFn = () => (
  <div className="card max-w-sm p-4">
    <ComponentPlaceholder />
  </div>
);
