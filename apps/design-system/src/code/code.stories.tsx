import type { Meta, StoryFn } from '@storybook/react-vite';
import { useDarkMode } from '@vueless/storybook-dark-mode';

import { Code } from './code';

const meta = {
  title: 'DesignSystem/Code',
} satisfies Meta;

export default meta;

export const code: StoryFn = () => {
  return (
    <Code
      lang="javascript"
      value={`import type { Meta } from '@storybook/react-vite';\n\nexport default {\n  title: 'MyStory',\n} satisfies Meta;`}
      theme={useDarkMode() ? 'dark' : 'light'}
    />
  );
};
