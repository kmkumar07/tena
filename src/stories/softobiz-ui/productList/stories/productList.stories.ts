import {
  Meta,
  StoryObj,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { productListComponent } from '../productList.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { SidebarComponent } from 'src/app/core/layouts/sidebar/sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';


// import { LeftNavigationComponent } from '../../leftNavigation/leftNavigation.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<productListComponent> = {
  component: productListComponent,
  title: 'softobiz-ui/Pages/productList',
  tags: ['autodocs'],
  render: (args: productListComponent) => ({
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
                      <div *ngIf="element.name != 'Dashboard'" class="category-heading">
                        <h1 class="mat-caption font-weight-600">{{ element.name }}</h1>
                      </div>
                      <mat-list-item class="nav-list-item p-0 w-full" *ngFor="let item of getList(element.category)">
                        <a class="icon-wrapper flex align-center">
                          <div class="flex justify-center sidebar-icon-wraper">
                            <mat-icon class="material-symbols-outlined m-0 sidebar-icon mat-primary">{{ item.icon
                              }}</mat-icon>
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
                  <mat-list-item class="nav-list-item p-0" *ngFor="let item of configOptions">
                    <a class="icon-wrapper flex align-center" [routerLink]="['/', item.state]">
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
            <mat-toolbar class="header-wrapper relative main-bg">
              <div class="absolute left-header pointer">
                <mat-icon class="material-symbols-outlined mat-primary" (click)="sidenav.toggle()">
                  menu_open
                </mat-icon>
              </div>
              <div class="header-right">
                <div class="language-section pointer mr-4">
                  <img src="en.png" alt="language flag" />
                </div>
                <div class="notifications-section pointer" [matMenuTriggerFor]="notificationsMenu" matBadge="3"
                  matBadgeSize="small" matBadgeColor="warn">
                  <img src="/icons/notifications.svg" alt="notifications-icon" />
                </div>
                <mat-menu #notificationsMenu="matMenu" class="notifications-menu border-2" backdropClass="right-menu">
                  <div class="notifications-header">
                    <div class="flex align-center justify-between">
                      <div class="label">Notifications</div>
                      <mat-chip class="basic-chip"> 4 New </mat-chip>
                    </div>
                    <div class="tab-panel" (click)="preventClose($event)">
                      <mat-tab-group mat-stretch-tabs="false" mat-align-tabs="start">
                        <mat-tab label="All (4)">
                          <div class="relative h-55" *ngIf="notificationsData.length == 0">
                            <div class="absolute position-center text-center w-full">
                              <img src="/notifications-icon.png" alt="notification-icon">
                              <span class="block mt-6">
                                Hey! You have no notifications.
                              </span>
                            </div>
                          </div>
                          <div class="notification-list" (click)="preventClose($event)" *ngIf="notificationsData.length > 0">
                          </div>
                        </mat-tab>
                        <mat-tab label="Messages">
                          <div class="relative h-55" *ngIf="notificationsData.length == 0">
                            <div class="absolute position-center text-center w-full">
                              <img src="/notifications-icon.png" alt="no data" />
                              <span class="block mt-6">
                                Hey! You have no notifications.
                              </span>
                            </div>
                          </div>
                          <div class="message-list" (click)="preventClose($event)" *ngIf="notificationsData.length > 0">
                            My Messages
                          </div>
                        </mat-tab>
                        <mat-tab label="Alerts">
                          <div class="relative h-55" *ngIf="notificationsData.length == 0">
                            <div class="absolute position-center text-center w-full">
                              <img src="/notifications-icon.png" alt="notifications-icon" />
                              <span class="block mt-6">
                                Hey! You have no notifications.
                              </span>
                            </div>
                          </div>
                          <div class="message-list" (click)="preventClose($event)" *ngIf="notificationsData.length > 0">
                            Alerts
                          </div>
                        </mat-tab>
                      </mat-tab-group>
                    </div>
                    <div class="text-center modal-footer pointer" (click)="preventClose($event)">
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
                <mat-menu #menu="matMenu" class="profile-menu" backdropClass="alert-menu">
                  <div class="profile-menu-outer">
                    <div class="grad-bg">
                      <div class="user-initials">JS</div>
                    </div>
                    <div class="profile-inner">
                      <p class="mat-h1 fw-600 m-0">John Smith</p>
                      <p class="m-0 mt-1">Founder</p>
                    </div>
                    <div class="profile-paths">
                      <a class="flex align-center justify-between user-link" *ngFor="let element of userProfile">
                        <div class="flex align-center">
                          <mat-icon class="material-symbols-outlined mat-primary">{{
                            element.icon
                            }}</mat-icon>
                          <span class="ml-3">{{ element.name }}</span>
                        </div>
                        <div *ngIf="element.toggle">
                          <mat-slide-toggle color="primary" (click)="preventClose($event)"
                            (change)="switchDark($event)"></mat-slide-toggle>
                        </div>
                      </a>
                    </div>
                  </div>
                </mat-menu>
              </div>
            </mat-toolbar>
            <div class="h-full relative">
              <div class="relative border-2 w-full h-full py-6 pl-5 pr-6 overflow-auto mat-primary">
                <div class="flex justify-between align-center px-1">
                  <div class="flex align-center">
                    <h1 class="text-text text-dark">Products</h1>
                    <mat-chip class="chip-dark ml-3">
                      2
                    </mat-chip>
                  </div>
      
                  <ng-template #allProductsFound>
                    <div class="flex align-center">
                      <h1 class="text-text text-dark">Products</h1>
                      <mat-chip class="chip-dark ml-3">
                        {{ totalNumberOfProduct }}
                      </mat-chip>
                    </div>
                  </ng-template>
      
                  <div class="flex align-center">
                    <div class="global-search main-bg mr-6 border-2">
                      <span class="search-icon pointer">
                        <img src="/search.png" alt="search-icon" />
                      </span>
                      <input type="text" placeholder="Search anything..." [(ngModel)]="searchQuery"
                        (input)="onSearchInput()" />
                    </div>
                    <button mat-flat-button color="primary" class="create-btn">
                      <mat-icon class="material-symbols-outlined m-0 white-text">add_circle</mat-icon>
                      <span class="text-nowrap block ml-2 letter-spacing-0">Create Product</span>
                    </button>
                  </div>
                </div>
                <div class="primary-table overflow-visible mt-8 px-1 pb-2 table-wrapper">
                  <table mat-table [dataSource]="ProductData">
                    <!-- productId -->
                    <ng-container matColumnDef="productId">
                      <th mat-header-cell *matHeaderCellDef class="text-blue-darken">#ID</th>
                      <td mat-cell *matCellDef="let element">{{ element.product_ID }}</td>
                    </ng-container>
              
                    <!-- name Column -->
                    <ng-container matColumnDef="name">
                      <th mat-header-cell *matHeaderCellDef class="text-blue-darken">Product Name</th>
                      <td mat-cell *matCellDef="let element">{{ element.name }}</td>
                    </ng-container>
              
                   <!-- Features Column -->
                   <ng-container matColumnDef="feature">
                    <th mat-header-cell *matHeaderCellDef class="text-blue-darken">Features</th>
                    <td mat-cell *matCellDef="let element">
                      <div
                        class="flex align-center"
                        [ngxTippy]="featureListinfo"
                        [tippyProps]="{ placement: 'right'}"
                      >
                        <mat-chip
                          *ngIf="element.features.length > 0"
                          class="table-chip m-2 ml-0 mat-body-1"
                          disableRipple
                          >{{ element.features[0] }}</mat-chip
                        >
                        <mat-chip
                          *ngIf="element.features.length > 1"
                          class="table-chip m-2 ml-0 pointer mat-body-1"
                          >+{{ element.features.length - 1 }}</mat-chip
                        >
                        <ng-template #featureListinfo let-name class="t-template">
                          <div class="help-info-tooltip">
                            <div class="heading-with-background text-blue-darken">Features</div>
                            <div *ngFor="let feature of element.feature">
                              <button mat-button class="p-2 py-3">
                                {{ feature.name }}
                              </button>
                            </div>
                          </div>
                        </ng-template>
                      </div>
                    </td>
                  </ng-container>
              
                    <!-- createdOn Column -->
                    <ng-container matColumnDef="created_at">
                      <th mat-header-cell *matHeaderCellDef class="text-blue-darken">Created on</th>
                      <td mat-cell *matCellDef="let element">
                        <p>{{ element.created_at }}</p>
                      </td>
                    </ng-container>
              
                    <!-- status Column -->
                    <ng-container matColumnDef="status">
                      <th mat-header-cell *matHeaderCellDef class="text-blue-darken">Status</th>
                      <td mat-cell *matCellDef="let element"  [ngClass]="element.status === 'Active' ? 'Active' : 'InActive'">
                        <span class="">
                          {{ element.status }}
                        </span>
                      </td>
                    </ng-container>
              
                 <!-- Created Date Column -->
                 <ng-container matColumnDef="action">
                  <th mat-header-cell *matHeaderCellDef class="text-right text-blue-darken">Action</th>
                  <td mat-cell *matCellDef="let element" class="text-right">
                    <mat-icon
                      class="material-symbols-outlined mat-primary"
                      [matMenuTriggerFor]="actionsMenu"
                    >
                      more_vert
                    </mat-icon>
                    <mat-menu
                      #actionsMenu="matMenu"
                      class="actions-menu"
                      backdropClass="edit-menu"
                    >
                      <button mat-menu-item disableRipple>Edit</button>
                      <button
                        mat-menu-item
                        disableRipple
                        (click)="openDelete(element.productId)"
                      >
                        Delete
                      </button>
                    </mat-menu>
                  </td>
                </ng-container>
              
                    <tr mat-header-row *matHeaderRowDef="displayedColumns1"></tr>
                    <tr mat-row *matRowDef="let row; columns: displayedColumns1"></tr>
                  </table>
                  <div class="row">
                    <div class="col-2">
                      <div class="dataTables_length">
                        <label
                          >Show
              
                          <select
                            [(ngModel)]="limit"
                            (change)="
                              this.getProduct(
                                this.PageNumber,
                                this.limit,
                                this.search,
                                this.sortBy,
                                this.sortOrder
                              )
                            "
                          >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>
              
                          entries</label
                        >
                      </div>
                    </div>
              
                    <div class="col-md-10" style="float: right; text-align: right">
                      <div class="paginations">
                        <div>
                          <div class="btn-group" id="radioBtn">
                            <a
                              class="btn btn-primary btn-sm notActive"
                              (click)="onPrevious()"
                              [ngClass]="{ disabled: PageNumber == 1 }"
                            >
                              Previous
                            </a>
                            <a class="btn btn-primary btn-sm active" style="margin: 0 20px">{{
                              PageNumber
                            }}</a>
                            <a
                              class="btn btn-primary btn-sm notActive"
                              (click)="onNext()"
                              [ngClass]="{ disabled: !hasNextPage||searchDataNextPage }"
                              >Next
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
type Story = StoryObj<productListComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const productList: Story = {
  args: {},
};
