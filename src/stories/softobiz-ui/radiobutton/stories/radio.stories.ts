import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { RadioButtonComponent } from '../radio.component';
import { MatRadioModule } from '@angular/material/radio';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<RadioButtonComponent> = {
  component: RadioButtonComponent,
  title: 'softobiz-ui/Atom/Radio',
  tags: ['autodocs'],
  render: (args: RadioButtonComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: {
    disable: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
    disableRipple: {
      control: 'boolean',
    },
    color: {
      options: ['primary', 'accent', 'warn'],
      control: { type: 'radio' },
    },
    indeterminate: {
      control: 'boolean',
      option: [true, false],
    },
    label: {
      control: 'text',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [MatRadioModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<RadioButtonComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const RadioButton: Story = {
  args: {
    indeterminate: false,
    label: 'Click Me!',
    checked: false,
    disable: false,
    disableRipple: false,
    labelPosition: 'after',
  },
};
