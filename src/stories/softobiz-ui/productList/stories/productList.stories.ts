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
    // globalService: { table: { disable: true } },
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
        <div
        *ngIf="allProductsData > 0||search.length > 0; else noDataList"
        class="relative border-2 w-full h-full py-6 pl-5 pr-6 overflow-auto mat-primary"
      >
        <div class="flex justify-between align-center px-1">
          <div
            class="flex align-center"
            *ngIf="search.length > 0; else allProductsFound"
          >
            <h1 class="text-text text-dark">Products</h1>
            <mat-chip class="chip-dark ml-3">
              {{ totalNumberOfProductBySearch }}
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
                <img
                  src="../../../../assets/images/icons/search.svg"
                  alt="search-icon"
                />
              </span>
              <input
                type="text"
                placeholder="Search anything..."
                [(ngModel)]="searchQuery"
                (input)="onSearchInput()"
              />
            </div>
            <button
              mat-flat-button
              color="primary"
              class="create-btn"
              [routerLink]="['create']"
            >
              <mat-icon class="material-symbols-outlined m-0 white-text"
                >add_circle</mat-icon
              >
              <span class="text-nowrap block ml-2 letter-spacing-0"
                >Create Product</span
              >
            </button>
          </div>
        </div>
        <div
          *ngIf="productsSearchData.length > 0; else noDataFound"
          class="primary-table mt-8 px-1 pb-2"
        >
          <table
            mat-table
            [dataSource]="productsSearchData"
            matSort
            (matSortChange)="announceSortChange($event)"
          >
            <!-- Product ID Column -->
            <ng-container matColumnDef="productId">
              <th mat-header-cell *matHeaderCellDef class="text-blue-darken">#ID</th>
              <td
                mat-cell
                *matCellDef="let element"
                [routerLink]="['/products/view-product/' + element.productId]"
              >
                {{ element.productId }}
              </td>
            </ng-container>
            
            <!-- Product Name Column -->
            <ng-container matColumnDef="name">
              <th
                mat-header-cell
                *matHeaderCellDef
                mat-sort-header
                sortActionDescription="Sort by title"
                class="text-blue-darken"
              >
                Product Name
              </th>
              <td
                mat-cell
                *matCellDef="let element"
                [routerLink]="['/products/view-product/' + element.productId]"
              >
                {{ element.name }}
              </td>
            </ng-container>
      
            <!-- Features Column -->
            <ng-container matColumnDef="feature">
              <th mat-header-cell *matHeaderCellDef class="text-blue-darken">Features</th>
              <td mat-cell *matCellDef="let element">
                <div
                  class="flex align-center"
                  [ngxTippy]="featureListinfo"
                  [tippyProps]="{ placement: 'right' }"
                  [routerLink]="['/products/view-product/' + element.productId]"
                >
                  <mat-chip
                    *ngIf="element.feature.length > 0"
                    class="table-chip m-2 ml-0 mat-body-1"
                    disableRipple
                    >{{ element.feature[0].name }}</mat-chip
                  >
                  <mat-chip
                    *ngIf="element.feature.length > 1"
                    class="table-chip m-2 ml-0 pointer mat-body-1"
                    >+{{ element.feature.length - 1 }}</mat-chip
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
      
            <!-- Created Date Column  -->
            <ng-container matColumnDef="createdOn">
              <th
                mat-header-cell
                *matHeaderCellDef
                mat-sort-header
                sortActionDescription="Sort by date"
                class="text-blue-darken"
              >
                Created On
              </th>
              <td
                mat-cell
                *matCellDef="let element"
                [routerLink]="['/products/view-product/' + element.productId]"
              >
                {{ element.createdOn | date : "d MMMM y" }}
              </td>
            </ng-container>
      
            <!-- Created Date Column -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef class="text-blue-darken">Status</th>
              <td
                mat-cell
                *matCellDef="let element"
                [ngClass]="element.status === 'Active' ? 'Active' : 'InActive'"
                [ngClass]="element.status"
                [routerLink]="['/products/view-product/' + element.productId]"
              >
                {{ element.status }}
              </td>
            </ng-container>
      
            <ng-container matColumnDef="action">
              <th mat-header-cell *matHeaderCellDef class="text-blue-darken">Action</th>
              <td mat-cell *matCellDef="let element">
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
                  <button
                    mat-menu-item
                    disableRipple
                    [routerLink]="['edit-product/' + element.productId]"
                  >
                    Edit
                  </button>
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
      
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr
              mat-row
              *matRowDef="let row; columns: displayedColumns"
              class="pointer"
              [id]="row.id"
            ></tr>
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
        <ng-template #noDataFound>
          <div class="relative border-2 w-full h-full p-7 overflow-auto">
            <app-no-item-found></app-no-item-found>
          </div>
        </ng-template>
      </div>
      <ng-template #noDataList>
        <div class="relative border-2 w-full h-full p-7 overflow-auto">
          <app-empty-listing [items]="emptyProductPros"></app-empty-listing>
        </div>
      </ng-template>
      
      
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
