import type { Meta, StoryFn } from '@storybook/react-vite';
import { useState } from 'react';

import { ComponentPlaceholder } from '../utils/storybook';
import { AccordionHeader, AccordionSection } from './accordion';

type Args = {
  hasError?: boolean;
};

export default {
  title: 'DesignSystem/Accordion',
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
  args: {
    hasError: false,
  },
} satisfies Meta<Args>;

export const accordion: StoryFn<Args> = ({ hasError }) => {
  const [expanded, setExpanded] = useState<number>();

  return (
    <>
      {[1, 2, 3].map((item) => (
        <AccordionSection
          key={item}
          header={
            <AccordionHeader
              className="p-4"
              hasError={hasError && item === 2}
              expanded={expanded === item}
              setExpanded={(expanded) => setExpanded(expanded ? item : undefined)}
            >
              item {item} header
            </AccordionHeader>
          }
          isExpanded={expanded === item}
          hasError={hasError && item === 2}
        >
          <ComponentPlaceholder />
        </AccordionSection>
      ))}
    </>
  );
};
