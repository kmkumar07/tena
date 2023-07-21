import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { InputComponent } from '../input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxTippyModule } from 'ngx-tippy-wrapper';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<InputComponent> = {
  component: InputComponent,
  title: 'softobiz-ui/Atom/Input',
  tags: ['autodocs'],
  render: (args: InputComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: {
    hint: { control: 'text' },
    class: { control: 'text' },
    infoIcon: {
      control: 'boolean',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        NgxTippyModule,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<InputComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const Input: Story = {
  args: {
    readonly: false,
    placeholder: 'Enter here...',
    disable: false,
    required: true,
    label: 'Label',
    infoIcon: false,
    infoTitle: 'Title',
    infoDetail:
      'Microsoft Teams is the ultimate messaging app for your organization—a workspace for real-time collaboration and communication, meetings, file and app sharing, and even the occasional emoji! All in one place, all in the open, all accessible to everyone.',
  },
};
