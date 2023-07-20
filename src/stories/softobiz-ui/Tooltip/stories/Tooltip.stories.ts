import { Meta, StoryObj, moduleMetadata,   componentWrapperDecorator, } from '@storybook/angular';
import { TooltipComponent } from '../Tooltip.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { NgxTippyModule } from 'ngx-tippy-wrapper';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<TooltipComponent> = {
  component: TooltipComponent,
  title: 'softobiz-ui/Molecules/Tooltip',
  tags: ['autodocs'],
  render: (args: TooltipComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: {
    infoTitle: { control: 'text' },
    infoDetail: { control: 'text' },
  },
  decorators: [
    componentWrapperDecorator(
      (story) => `<div class="tooltip-wrapper" >${story}</div>`
    ),
    moduleMetadata({
      imports: [
        MatMenuModule,
        MatButtonModule,
        MatDialogModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatIconModule,
        AngularMaterialModule,
        NgxTippyModule,
      ],
    }),
  ],

};

export default meta;
type Story = StoryObj<TooltipComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const Tooltip: Story = {
args: {
  infoTitle: 'Coupon id',
  infoDetail: `Enter a Customized Id. If user do not enter this field, the system will generate a Customized Human-Readable-id' based on the Name field.`,
}
};

