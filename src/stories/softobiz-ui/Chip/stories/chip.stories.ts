import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ChipComponent } from '../chip.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<ChipComponent> = {
  component: ChipComponent,
  title: 'softobiz-ui/Atom/Chip',
  tags: ['autodocs'],
  render: (args: ChipComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: {
    // color: {
    //   options: ['primary', 'accent', 'warn', 'primary-light'],
    //   control: { type: 'radio' },
    // },

    ariaDescription: {
      control: 'text',
    },

    ariaLabel: {
      control: 'text',
    },

    disableRipple: {
      control: 'boolean',
    },

    disabled: {
      control: 'boolean',
    },

    // selected: {
    //   control: 'boolean',
    // },

    highlighted: {
      control: 'boolean',
    },

    withIcon: {
      control: 'boolean',
    },

    label: { control: 'text' },

    class: {
      control: 'text',
    },
    id: {
      control: 'text',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [MatChipsModule, MatIconModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<ChipComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const Chip: Story = {
  args: {
    highlighted: true,
    withIcon: false,
    disabled: false,
    label: 'chip',
  },
};
