import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { SearchbarComponent } from '../searchbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<SearchbarComponent> = {
  component: SearchbarComponent,
  title: 'softobiz-ui/Atom/Searchbar',
  tags: ['autodocs'],
  render: (args: SearchbarComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: {
  },
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<SearchbarComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const Searchbar: Story = {
  args: {
    placeholder: 'Enter here...',
    disable: false,
  },
};
