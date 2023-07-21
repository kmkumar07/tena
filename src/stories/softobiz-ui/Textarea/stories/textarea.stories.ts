import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TextareaComponent } from '../textarea.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxTippyModule } from 'ngx-tippy-wrapper';


// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<TextareaComponent> = {
  component: TextareaComponent,
  title: 'softobiz-ui/Atom/Textarea',
  tags: ['autodocs'],
  render: (args: TextareaComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: {
    hint: { control: 'text' },
    class: { control: 'text' },
    appearance: {
      control: 'select',
      options: [
        'outline',
        'fill'
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        NgxTippyModule
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<TextareaComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const Textarea: Story = {
  args: {
    readonly: false,
    placeholder: 'Enter here...',
    disable: false,
    required: true,
    label: 'Label',
  },
};
