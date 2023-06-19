import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { SwitchButtonComponent } from '../switch.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<SwitchButtonComponent> = {
  component: SwitchButtonComponent,
  title: 'softobiz-ui/Atom/switch',
  tags: ['autodocs'],
  render: (args: SwitchButtonComponent) => ({
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
      imports: [MatSlideToggleModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<SwitchButtonComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const SwitchButton: Story = {
  args: {
    indeterminate: false,
    label: 'Click Me!',
    checked: false,
    disable: false,
    disableRipple: false,
    color: "primary",
    labelPosition: 'after',
  },
};
