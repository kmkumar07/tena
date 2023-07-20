import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ColorComponent } from '../color.component';
// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<ColorComponent> = {
  component: ColorComponent,
  title: 'softobiz-ui/Atom/Color',
  tags: ['autodocs'],
  render: (args: ColorComponent) => ({
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
        <div class="mb-3">
    <p class="mat-headline-5 mb-3">Primary</p>
    <div class="flex">
        <div class="color-box large-box primary-bg mr-2"></div>
        <div class="color-box medium primary-light-bg mr-2"></div>
        <div class="color-box medium primary-dark-1-bg"></div>
    </div>
</div>

<div class="mb-3">
    <p class="mat-headline-5 mb-3">Neutral</p>
    <div class="flex">
        <div class="color-box small neutral-black-bg mr-2"></div>
        <div class="color-box small neutral-dark-gray-bg mr-2"></div>
        <div class="color-box small neutral-gray-bg mr-2"></div>
        <div class="color-box small neutral-gray-Outline-bg mr-2"></div>
        <div class="color-box small neutral-gray-light-bg mr-2"></div>
        <div class="color-box small neutral-gray-off-bg mr-2"></div>
        <div class="color-box small neutral-gray-stroke-bg mr-2"></div>
        <div class="color-box small neutral-gray-off-white-bg mr-2"></div>
        <div class="color-box small main-bg mr-2 border-outline"></div>
    </div>
</div>

<div class="mb-3">
    <p class="mat-headline-5 mb-3">Utility</p>
    <div class="flex mb-3">
        <div class="color-box small green-success-bg mr-2"></div>
        <div class="color-box small green-lighten-100-bg mr-2"></div>
        <div class="color-box small green-lighten-200-bg mr-2"></div>
        <div class="color-box small green-lighten-300-bg mr-2"></div>
        <div class="color-box small green-lighten-400-bg mr-2"></div>
        <div class="color-box small green-lighten-500-bg mr-2"></div>
        <div class="color-box small green-lighten-600-bg mr-2"></div>
        <div class="color-box small green-lighten-700-bg mr-2"></div>
        <div class="color-box small extent green-success-bg mr-2"></div>
        <div class="color-box small green-lighten-900-bg mr-2"></div>
        <div class="color-box small green-lighten-1000-bg mr-2"></div>
    </div>
    <div class="flex mb-3">
        <div class="color-box small blue-bg mr-2"></div>
        <div class="color-box small blue-lighten-100-bg mr-2"></div>
        <div class="color-box small blue-lighten-200-bg mr-2"></div>
        <div class="color-box small blue-lighten-300-bg mr-2"></div>
        <div class="color-box small blue-lighten-400-bg mr-2"></div>
        <div class="color-box small blue-lighten-500-bg mr-2"></div>
        <div class="color-box small blue-lighten-600-bg mr-2"></div>
        <div class="color-box small extent blue-bg mr-2"></div>
        <div class="color-box small blue-lighten-800-bg mr-2"></div>
        <div class="color-box small blue-lighten-900-bg mr-2"></div>
        <div class="color-box small blue-lighten-1000-bg mr-2"></div>
    </div>
    <div class="flex mb-3">
        <div class="color-box small orange-bg mr-2"></div>
        <div class="color-box small orange-lighten-100-bg mr-2"></div>
        <div class="color-box small orange-lighten-200-bg mr-2"></div>
        <div class="color-box small orange-lighten-300-bg mr-2"></div>
        <div class="color-box small orange-lighten-400-bg mr-2"></div>
        <div class="color-box small orange-lighten-500-bg mr-2"></div>
        <div class="color-box small extent orange-lighten-600-bg mr-2"></div>
        <div class="color-box small orange-lighten-700-bg mr-2"></div>
        <div class="color-box small orange-lighten-800-bg mr-2"></div>
        <div class="color-box small orange-lighten-900-bg mr-2"></div>
        <div class="color-box small orange-lighten-1000-bg mr-2"></div>
    </div>
    <div class="flex">
        <div class="color-box small red-bg mr-2"></div>
        <div class="color-box small red-lighten-100-bg mr-2"></div>
        <div class="color-box small red-lighten-200-bg mr-2"></div>
        <div class="color-box small red-lighten-300-bg mr-2"></div>
        <div class="color-box small red-lighten-400-bg mr-2"></div>
        <div class="color-box small red-lighten-500-bg mr-2"></div>
        <div class="color-box small red-lighten-600-bg mr-2"></div>
        <div class="color-box small red-lighten-700-bg mr-2"></div>
        <div class="color-box small extent red-lighten-800-bg mr-2"></div>
        <div class="color-box small red-lighten-900-bg mr-2"></div>
        <div class="color-box small red-lighten-1000-bg mr-2"></div>
    </div>
</div>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ColorComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const Color: Story = {
  args: {},
};
