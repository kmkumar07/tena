import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CalendarComponent } from '../calendar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

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
      ],
    }),
  ],
  parameters: {
    docs: {
      source: {
        code: `
        <mat-icon class="material-symbols-outlined" [matMenuTriggerFor]="actionsMenu">
          more_vert
        </mat-icon>
        <mat-menu #actionsMenu="matMenu" class="actions-menu" backdropClass="edit-menu">
          <button mat-menu-item disableRipple>Edit</button>
          <button mat-menu-item disableRipple >
            Delete
          </button>
        </mat-menu>
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
