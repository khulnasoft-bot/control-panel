import type { Preview } from '@storybook/react-vite';

import '@fontsource-variable/inter';
import './styles.css';

export default {
  parameters: {
    darkMode: {
      classTarget: 'html',
      stylePreview: true,
    },
  },
} satisfies Preview;
