import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DialogComponent } from '../dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<DialogComponent> = {
  component: DialogComponent,
  title: 'softobiz-ui/Organism/Dialog',
  tags: ['autodocs'],
  render: (args: DialogComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: {},
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule, MatIconModule, AngularMaterialModule]
    }),
  ],
  parameters: {
    docs: {
      source: {
        code: `
        <button mat-menu-item disableRipple (click)="openDelete()">
        Delete
       </button>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<DialogComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const Dialog: Story = {
  args: {},
};
