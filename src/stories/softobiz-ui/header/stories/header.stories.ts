import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { HeaderComponent } from '../header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { ProfileComponent } from '../../profile/profile.component';
import { SearchbarComponent } from '../../searchbar/searchbar.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<HeaderComponent> = {
  component: HeaderComponent,
  title: 'softobiz-ui/Molecules/Header',
  tags: ['autodocs'],
  render: (args: HeaderComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: {},
  decorators: [
    moduleMetadata({
      imports: [
        AngularMaterialModule,
        BrowserAnimationsModule,
      ],
      declarations: [ProfileComponent, SearchbarComponent],
    }),
  ],

  parameters: {
    docs: {
      source: {
        code: `
          <div class="header-wrapper border-2">
            <sft-searchbar></sft-searchbar>
            <div class="header-right">
              <div
                class="notifications-section pointer"
                [matMenuTriggerFor]="notificationsMenu"
                matBadge="3"
                matBadgeSize="small"
                matBadgeColor="warn"
              >
                <img src="/icons/notifications.svg" alt="notifications-icon" />
              </div>
              <mat-menu
                #notificationsMenu="matMenu"
                class="notifications-menu border-2"
                backdropClass="right-menu"
              >
                <div class="notifications-header">
                  <div class="flex align-center justify-between">
                    <div class="label">Notifications</div>
                    <mat-chip class="basic-chip"> 4 New </mat-chip>
                  </div>
                  <div class="tab-panel" (click)="preventClose($event)">
                    <mat-tab-group mat-stretch-tabs="false" mat-align-tabs="start">
                      <mat-tab label="All (4)">
                        <div
                          class="relative h-55"
                          *ngIf="notificationsData.length == 0"
                        >
                          <div class="absolute position-center text-center w-full">
                            <img src="/notifications-icon.png" alt="no data" />
                            <span class="block mt-6">
                              Hey! You have no notifications.
                            </span>
                          </div>
                        </div>
                        <div
                          class="notification-list"
                          (click)="preventClose($event)"
                          *ngIf="notificationsData.length > 0"
                        ></div>
                      </mat-tab>
                      <mat-tab label="Messages">
                        <div
                          class="relative h-55"
                          *ngIf="notificationsData.length == 0"
                        >
                          <div class="absolute position-center text-center w-full">
                            <img src="/notifications-icon.png" alt="no data" />
                            <span class="block mt-6">
                              Hey! You have no notifications.
                            </span>
                          </div>
                        </div>
                        <div
                          class="message-list"
                          (click)="preventClose($event)"
                          *ngIf="notificationsData.length > 0"
                        >
                          My Messages
                        </div>
                      </mat-tab>
                      <mat-tab label="Alerts">
                        <div
                          class="relative h-55"
                          *ngIf="notificationsData.length == 0"
                        >
                          <div class="absolute position-center text-center w-full">
                            <img src="/notifications-icon.png" alt="no data" />
                            <span class="block mt-6">
                              Hey! You have no notifications.
                            </span>
                          </div>
                        </div>
                        <div
                          class="message-list"
                          (click)="preventClose($event)"
                          *ngIf="notificationsData.length > 0"
                        >
                          Alerts
                        </div>
                      </mat-tab>
                    </mat-tab-group>
                  </div>
                  <div
                    class="text-center modal-footer pointer"
                    (click)="preventClose($event)"
                  >
                    <span class="block py-4"> View All </span>
                  </div>
                </div>
              </mat-menu>
              <sft-profile></sft-profile>
            </div>
          </div>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<HeaderComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const Header: Story = {
  args: {},
};
