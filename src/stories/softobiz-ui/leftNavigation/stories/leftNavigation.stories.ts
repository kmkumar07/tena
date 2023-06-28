import {
  Meta,
  StoryObj,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { LeftNavigationComponent } from '../leftNavigation.component';
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

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<LeftNavigationComponent> = {
  component: LeftNavigationComponent,
  title: 'softobiz-ui/Organism/Left Navigation',
  tags: ['autodocs'],
  render: (args: LeftNavigationComponent) => ({
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
        MatMenuModule,
        MatMenuModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatChipsModule,
        MatSidenavModule,
        // ActivatedRoute,
        MatChipsModule,
        MatSlideToggleModule,
        RouterTestingModule,
        MatListModule,
        MatButtonModule,
      ],
      declarations: [SidebarComponent],
    }),
  ],

  parameters: {
    docs: {
      source: {
        code: `
          <div class="outer-layout">
            <mat-sidenav-container [ngClass]="opened ? 'sidenav-open' : 'sidenav-closed'">
              <mat-sidenav #sidenav mode="side" opened="true" class="sidenav-slider">
                <div class="sidenav-wrapper border-2">
                  <div class="sidebar-toggle">
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
                  </div>
                  <div class="sidebar-wrapper">
                    <div class="logo pointer">
                      <div class="logo-img pointer">
                        <img src="/framework-logo.png" alt="logo" />
                      </div>
                      <div class="text-wrapper">
                        <h3>Digital</h3>
                        <span class="logo-text">Framework</span>
                      </div>
                    </div>
                    <div class="sidebar-scrollable mt-11">
                      <mat-nav-list class="sidebar p-0">
                        <div *ngFor="let element of Menu_Headings" class="transition-400">
                          <div
                            *ngIf="element.name != 'Dashboard'"
                            class="category-heading"
                          >
                            <h1>{{ element.name }}</h1>
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
                                  class="material-symbols-outlined m-0 sidebar-icon"
                                  >{{ item.icon }}</mat-icon
                                >
                              </div>
                              <div class="content-wrapper">
                                <span class="content">{{ item.name }}</span>
                              </div>
                            </a>
                          </mat-list-item>
                        </div>
                      </mat-nav-list>
                      <div class="image-wrapper">
                        <div class="img">
                          <img src="/dashboard-cat.png" alt="Dashboard Get Started" />
                        </div>
                        <div class="text">
                          <h3>First steps</h3>
                          <p class="description">
                            Customize your dashboard and lean <br />about out features
                          </p>
                          <span class="pointer">Get Started</span>
                        </div>
                      </div>
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
                          <mat-icon class="material-symbols-outlined m-0 sidebar-icon">{{
                            item.icon
                          }}</mat-icon>
                          <div class="content-wrapper">
                            <span class="content">{{ item.name }}</span>
                          </div>
                        </a>
                      </mat-list-item>
                    </mat-nav-list>
                  </div>
                </div>
              </mat-sidenav>
              <mat-sidenav-content>
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
type Story = StoryObj<LeftNavigationComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const LeftNavigation: Story = {
  args: {},
};
