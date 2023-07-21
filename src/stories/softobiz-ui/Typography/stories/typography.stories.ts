import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TypographyComponent } from '../typography.component';
// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<TypographyComponent> = {
  component: TypographyComponent,
  title: 'softobiz-ui/Atom/Typography',
  tags: ['autodocs'],
  render: (args: TypographyComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: {
  },
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
  parameters: {
    docs: {
      source: {
        code: `
        <p class="mat-headline-5">Roboto /headline   24   Medium  It’s best to use good to know that</p>
        <p class="mat-subtitle-1">Roboto /Subheading   18   Medium  It’s best to use good to know that</p>
        <p class="mat-subtitle-2">Roboto /headline   16  Medium  It’s best to use good to know that</p>
        <p class="Roboto /table content">Roboto /headline   14   Medium  It’s best to use good to know that</p>
        <p class="mat-caption">Roboto /headline   12   Medium  It’s best to use good to know that</p>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<TypographyComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const Typography: Story = {
  args: {},
};
