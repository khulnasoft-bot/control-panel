import type { Meta, StoryFn } from '@storybook/react-vite';

import { Field, FieldHelperText, FieldLabel } from '../field/field';
import { TextArea } from './textarea';

type Args = {
  label: string;
  placeholder: string;
  helperText: string;
  disabled: boolean;
  readOnly: boolean;
  invalid: boolean;
};

export default {
  title: 'DesignSystem/TextArea',
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    helperText: '',
    disabled: false,
    readOnly: false,
    invalid: false,
  },
} satisfies Meta<Args>;

export const textArea: StoryFn<Args> = ({ label, placeholder, helperText, disabled, readOnly, invalid }) => {
  return (
    <Field
      label={<FieldLabel>{label}</FieldLabel>}
      helperText={<FieldHelperText invalid={invalid}>{helperText}</FieldHelperText>}
      className="max-w-sm"
    >
      <TextArea placeholder={placeholder} disabled={disabled} readOnly={readOnly} invalid={invalid} />
    </Field>
  );
};
