import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TabsComponent } from '../tabs.component';
import { MatTabsModule } from '@angular/material/tabs';
// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<TabsComponent> = {
  component: TabsComponent,
  title: 'softobiz-ui/Molecules/Tabs',
  tags: ['autodocs'],
  render: (args: TabsComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: {
    // periodUnit: ['Tab1', 'Tab2', 'Tab3', 'Tab4'],
    // periodUnit: {
    //   options: [['Another Item One', 'Another Item Two', 'Another Item Three']],
    // },
    // tablabel: { control: 'array' },
  },
  decorators: [
    moduleMetadata({
      imports: [MatTabsModule],
    }),
  ],
  parameters: {
    docs: {
      source: {
        code: `
        <mat-tab-group
          class="pricing-tabs mb-6"
          mat-stretch-tabs="false"
          mat-align-tabs="start"
        >
          <mat-tab label="First"> Content 1 </mat-tab>
          <mat-tab label="Second"> Content 2 </mat-tab>
          <mat-tab label="Third"> Content 3 </mat-tab>
        </mat-tab-group>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<TabsComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const Tabs: Story = {
  args: {},
};
