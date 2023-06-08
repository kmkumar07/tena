import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CheckboxComponent } from '../checkbox.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<CheckboxComponent> = {
  component: CheckboxComponent,
  title: 'softobiz-ui/Atom/Checkbox',
  tags: ['autodocs'],
  render: (args: CheckboxComponent) => ({
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
      option: [true, false]
    },
    label: {
      control:'text'
    },
    task: {
      table: {
        disable: true
      }
    },
  },
  decorators: [
    moduleMetadata({
      imports: [MatCheckboxModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const Checkbox: Story = {
  args: {
    indeterminate: false,
    label: 'Click Me!',
    checked: false,
    disable:false,
    disableRipple: false,
    labelPosition: 'after',
  },
};
