import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Breadcrumb } from '../breadcrumb.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<Breadcrumb> = {
  component: Breadcrumb,
  title: 'softobiz-ui/Atom/Breadcrumb',
  tags: ['autodocs'],
  render: (args: Breadcrumb) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: {
    id: { control: 'text' },
    class: { control: 'text' }
  },
  decorators: [
    moduleMetadata({
      imports: [MatIconModule, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<Breadcrumb>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const breadcrumb: Story = {
  args: {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Products', link: '/products' },
      { label: 'Category', link: '/products/category' },
      { label: 'Current Page' },
    ]
  },
};
