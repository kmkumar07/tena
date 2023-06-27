import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { NotificationComponent } from '../notification.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatBadgeModule } from '@angular/material/badge';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<NotificationComponent> = {
  component: NotificationComponent,
  title: 'softobiz-ui/Atom/Notification',
  tags: ['autodocs'],
  render: (args: NotificationComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: {
    badgeCount: {
      control: 'number',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    color: {
      options: ['primary', 'accent', 'warn'],
      control: { type: 'radio' },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        MatMenuModule,
        MatButtonModule,
        MatDialogModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatBadgeModule,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<NotificationComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const Notification: Story = {
  args: {
    badgeCount: 23,
    color: 'warn',
    size: 'small',
  },
};
