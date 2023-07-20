import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from '../button.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<ButtonComponent> = {
  component: ButtonComponent,
  title: 'softobiz-ui/Atom/Button',
  tags: ['autodocs'],
  render: (args: ButtonComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'raised',
        'flat',
        'stroked',
        'icon',
        'fab',
        'mini-fab',
      ],
    },
    color: {
      options: ['primary', 'accent', 'warn'],
      control: { type: 'radio' },
    },
    label: { control: 'text' },
    id: { control: 'text' },
    class: { control: 'text' },
    onClick: { control: 'text', defaultValue: 'clickfuntion()' },
    disable: {
      control: 'boolean',
      defaultValue: false,
    },
    disableRipple: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'link-text', 'icon-text'],
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [MatButtonModule, BrowserAnimationsModule, MatIconModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const Button: Story = {
  args: {
    variant: 'flat',
    color: 'primary',
    label: 'Button',
    size: 'medium',
    disable: false,
    disableRipple: false,
    onClick: 'funtion()',
  },
};

