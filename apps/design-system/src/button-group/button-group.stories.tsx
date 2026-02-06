import type { Meta, StoryFn } from '@storybook/react-vite';

import { Button } from '../button/button';
import { ButtonGroup } from './button-group';

export default {
  title: 'DesignSystem/ButtonGroup',
} satisfies Meta;

export const buttonGroup: StoryFn = () => (
  <ButtonGroup>
    <Button>Left</Button>
    <Button>Middle</Button>
    <Button>Right</Button>
  </ButtonGroup>
);
