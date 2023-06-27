import { Meta, StoryObj, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { CalendarComponent } from '../calendar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';                                
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<CalendarComponent> = {
  component: CalendarComponent,
  title: 'softobiz-ui/Molecules/Calendar',
  tags: ['autodocs'],
  render: (args: CalendarComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: {},
  decorators: [
    componentWrapperDecorator((story) => `<div class="storybook-calendar" >${story}</div>`),
    moduleMetadata({
      imports: [
        MatMenuModule,
        MatButtonModule,
        MatDialogModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule ,
        MatTabsModule
      ],
    }),
  ],
  parameters: {
    docs: {
      source: {
        code: `
        <div class="py-2 px-6">
        <div class="flex align-center input-wrapper px-2">
          <div class="block filter-input mr-4">
            <span class="block mat-body-1 pl-2 mb-1"> Start </span>
            <mat-form-field>
              <input
                matInput
                placeholder="Start Date"
                [(ngModel)]="startDate"


              />
            </mat-form-field>
          </div>
          <div class="block filter-input">
            <span class="block mat-body-1 pl-2 mb-1"> End </span>
            <mat-form-field>
              <input matInput type="text" placeholder="end Date" />
            </mat-form-field>
          </div>
        </div>
        <mat-calendar></mat-calendar>
        <div class="w-full flex justify-end align-center">
          <button mat-stroked-button color="primary" class="mr-3">Cancel</button>
          <button mat-flat-button color="primary">Apply</button>
        </div>
        </div>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<CalendarComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const Calendar: Story = {
  args: {},
};
