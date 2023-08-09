import {
  Meta,
  StoryObj,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { DashboardLayoutComponent } from '../dashboardLayout.component';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from 'src/app/core/layouts/sidebar/sidebar.component';
import { ActivatedRoute } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterTestingModule } from '@angular/router/testing';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../../header/header.component';
import { HeaderModule } from '../../header/header.module';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import { LeftNavigationComponent } from '../../leftNavigation/leftNavigation.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<DashboardLayoutComponent> = {
  component: DashboardLayoutComponent,
  title: 'softobiz-ui/Layout/Dashboard Layout',
  tags: ['autodocs'],
  render: (args: DashboardLayoutComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: {
    menuItems: { table: { disable: true } },
    configOptions: { table: { disable: true } },
    Menu_Headings: { table: { disable: true } },
    userProfile: { table: { disable: true } },
    notificationsData: { table: { disable: true } },
    activeRoute: { table: { disable: true } },
    currentRoute: { table: { disable: true } },
    globalService: { table: { disable: true } },
    opened: { table: { disable: true } },
    newItemEvent: { table: { disable: true } },
    toggleSidenav: { table: { disable: true } },
    route: { table: { disable: true } },
    getList: { table: { disable: true } },
    sidenav: { table: { disable: true } },
  },
  decorators: [
    componentWrapperDecorator(
      (story) => `<div class="left-navigation" >${story}</div>`
    ),
    moduleMetadata({
      imports: [
        CommonModule,
        AngularMaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule, 
      ],
      declarations: [
        SidebarComponent,
      ],
    }),
  ],

  parameters: {
    docs: {
      source: {
        code: `
        <div class="outer-layout">
        <mat-sidenav-container [ngClass]="opened ? 'sidenav-open' : 'sidenav-closed'">
          <mat-sidenav #sidenav mode="side" opened="true" class="sidenav-slider">
            <div class="sidenav-wrapper">
              <!-- <div class="sidebar-toggle">
                <button
                  mat-mini-fab
                  color="accent"
                  class="toggle-sidenav"
                  (click)="toggleSidenav()"
                >
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.269968 12.3681L1.42697 13.5186L7.85547 7.08355L1.42047 0.648554L0.269969 1.79905L5.55447 7.08355L0.269968 12.3681V12.3681Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div> -->
              <div class="sidebar-wrapper">
                <div class="">
                  <h3 class="mat-headline-5 font-weight-700 text-purple-lighten-1">Digital Framework</h3>
                </div>
                <div class="sidebar-scrollable mt-12">
                  <mat-nav-list class="sidebar p-0">
                    <div *ngFor="let element of Menu_Headings" class="transition-400 list-wrapper">
                      <div
                        *ngIf="element.name != 'Dashboard'"
                        class="category-heading"
                      >
                        <h1 class="mat-caption font-weight-600">{{ element.name }}</h1>
                      </div>
                      <mat-list-item
                        class="nav-list-item p-0 w-full"
                        *ngFor="let item of getList(element.category)"
                      >
                        <a
                          class="icon-wrapper flex align-center"
                        >
                          <div class="flex justify-center sidebar-icon-wraper">
                            <mat-icon
                              class="material-symbols-outlined m-0 sidebar-icon mat-primary"
                              >{{ item.icon }}</mat-icon
                            >
                          </div>
                          <div class="content-wrapper">
                            <span class="mat-subtitle-2 ml-2 text-grey-darken-9">{{ item.name }}</span>
                          </div>
                        </a>
                      </mat-list-item>
                    </div>
                  </mat-nav-list>
                </div>
                <mat-nav-list class="config-section sidebar">
                  <mat-list-item
                    class="nav-list-item p-0"
                    *ngFor="let item of configOptions"
                  >
                    <a
                      class="icon-wrapper flex align-center"
                      [routerLink]="['/', item.state]"
                    >
                      <mat-icon class="material-symbols-outlined m-0 sidebar-icon mat-primary">{{
                        item.icon
                      }}</mat-icon>
                      <div class="content-wrapper">
                        <span class="mat-subtitle-2 ml-2 text-grey-darken-9">{{ item.name }}</span>
                      </div>
                    </a>
                  </mat-list-item>
                </mat-nav-list>
              </div>
            </div>
          </mat-sidenav>
          <mat-sidenav-content>
            <!-- Header for application starts here! -->
            <mat-toolbar class="header-wrapper main-bg">
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
                              <img src="/notifications-icon.png" alt="notification-icon">
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
                              <img src="/notifications-icon.png" alt="notifications-icon" />
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
                        *ngFor="let element of userProfile"
                      >
                        <div class="flex align-center">
                          <mat-icon class="material-symbols-outlined mat-primary">{{
                            element.icon
                          }}</mat-icon>
                          <span class="ml-3">{{ element.name }}</span>
                        </div>
                        <div *ngIf="element.toggle">
                          <mat-slide-toggle
                            color="primary"
                            (click)="preventClose($event)"
                            (change)="switchDark($event)"
                          ></mat-slide-toggle>
                        </div>
                      </a>
                    </div>
                  </div>
                </mat-menu>
              </div>
            </mat-toolbar>
            <div class="pt-6 main-content-height">
              <router-outlet></router-outlet>
            </div>
          </mat-sidenav-content>
        </mat-sidenav-container>
      </div>
      
      
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<DashboardLayoutComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const DashboardLayout: Story = {
  args: {},
};
