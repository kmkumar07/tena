import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ProfileComponent } from '../profile.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<ProfileComponent> = {
  component: ProfileComponent,
  title: 'softobiz-ui/Molecules/Profile',
  tags: ['autodocs'],
  render: (args: ProfileComponent) => ({
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
        MatCardModule,
        MatDialogModule,
        MatDialogModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatIconModule,
      ],
    }),
  ],
  parameters: {
    docs: {
      source: {
        code: `
        <div class="user-profile pointer" [matMenuTriggerFor]="menu">
          <div class="user-image">
            <img src="/profile-avatar-1.png" />
          </div>
          <div class="user-info">
            <span class="name">John Smith</span>
            <span class="role">Founder</span>
          </div>
        </div>
        <mat-menu
          #menu="matMenu"
          class="profile-menu"
          backdropClass="alert-menu"
        >
          <div class="profile-menu-outer">
            <div class="grad-bg">
              <div class="user-initials">JS</div>
            </div>
            <div class="profile-inner">
              <p class="mat-h1 fw-600 m-0">John Smith</p>
              <p class="m-0 mt-1">Founder</p>
            </div>
            <div class="profile-paths">
              <a
                class="flex align-center justify-between user-link"
              >
                <div class="flex align-center">
                  <mat-icon class="material-symbols-outlined">account_circle</mat-icon>
                  <span class="ml-3">John</span>
                </div>
                <div >
                  <mat-slide-toggle
                    color="primary"
                  ></mat-slide-toggle>
                </div>
              </a>
              <a
                class="flex align-center justify-between user-link"
              >
                <div class="flex align-center">
                  <mat-icon class="material-symbols-outlined">inbox_outline</mat-icon>
                  <span class="ml-3">My Inbox</span>
                </div>
              </a>
              <a
                class="flex align-center justify-between user-link"
              >
                <div class="flex align-center">
                  <mat-icon class="material-symbols-outlined">clear_day</mat-icon>
                  <span class="ml-3">Dark Mode</span>
                </div>
              </a>
              <a
                class="flex align-center justify-between user-link"
              >
                <div class="flex align-center">
                  <mat-icon class="material-symbols-outlined">live_help</mat-icon>
                  <span class="ml-3">Help</span>
                </div>
              </a>
            </div>
          </div>
        </mat-menu>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ProfileComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const Profile: Story = {
  args: {},
};
