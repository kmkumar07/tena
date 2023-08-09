import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TableComponent } from '../table.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<TableComponent> = {
  component: TableComponent,
  title: 'softobiz-ui/Organism/Table',
  tags: ['autodocs'],
  render: (args: TableComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },

    couponsData: { table: { disable: true } },
    dialog: { table: { disable: true } },
    dialogRef: { table: { disable: true } },
    displayedColumns1: { table: { disable: true } },
    selection: { table: { disable: true } },
    announceSortChange: { table: { disable: true } },
    checkboxLabel: { table: { disable: true } },
    isAllSelected: { table: { disable: true } },
    openDelete: { table: { disable: true } },
    selectAll: { table: { disable: true } },
    selectedRow: { table: { disable: true } },
    sendElementId: { table: { disable: true } },
    toggleAllRows: { table: { disable: true } },
    sort: { table: { disable: true } },
    customHeader: { table: { disable: true } },
    displayedColumns: { table: { disable: true } },
    emptyCoupons: { table: { disable: true } },
    endDate: { table: { disable: true } },
    filterOptions: { table: { disable: true } },
    isOpened: { table: { disable: true } },
    ProductData: { table: { disable: true } },
    startDate: { table: { disable: true } },
    handleDateRangeSelection: { table: { disable: true } },
    openDatePicker: { table: { disable: true } },
    preventClose: { table: { disable: true } },
    setFilter: { table: { disable: true } },
  },
  decorators: [
    moduleMetadata({
      imports: [
        MatMenuModule,
        MatMenuModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatChipsModule,
        MatChipsModule,
        MatTableModule,
        AngularMaterialModule,
        // MatDialog,
        MatDialogModule,
        SharedModule
        // MatDialogRef
      ],
      declarations: [],
    }),
  ],

  parameters: {
    docs: {
      source: {
        code: `
          <div class="primary-table overflow-visible mt-8 px-1 pb-2">
          <table
            mat-table
            [dataSource]="couponsData"
            matSort
            (matSortChange)="announceSortChange($event)"
          >
            <!--- Note that these columns can be defined in any order.
                      The actual rendered columns are set as a property on the row definition" -->
            <ng-container matColumnDef="select">
              <th mat-header-cell *matHeaderCellDef>
                <mat-checkbox
                  color="primary"
                  (click)="selectAll(couponsData)"
                  (change)="$event ? toggleAllRows() : null"
                  [checked]="selection.hasValue() && isAllSelected()"
                  [indeterminate]="selection.hasValue() && !isAllSelected()"
                  [aria-label]="checkboxLabel()"
                >
                </mat-checkbox>
              </th>
              <td mat-cell *matCellDef="let row">
                <mat-checkbox
                  color="primary"
                  (click)="selectedRow(row.id, $event)"
                  (change)="$event ? selection.toggle(row) : null"
                  [checked]="selection.isSelected(row)"
                  [aria-label]="checkboxLabel(row)"
                >
                </mat-checkbox>
              </td>
            </ng-container>
        
            <!-- ID Column -->
            <ng-container matColumnDef="coupon_id">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>#Coupon ID</th>
              <td mat-cell *matCellDef="let element">{{ element.coupon_id }}</td>
            </ng-container>
        
            <!-- Product Name Column -->
            <ng-container matColumnDef="coupon_name">
              <th
                mat-header-cell
                *matHeaderCellDef
                mat-sort-header
                sortActionDescription="Sort by title"
              >
              Coupon Name
              </th>
              <td mat-cell *matCellDef="let element">{{ element.coupon_name }}</td>
            </ng-container>
        
            <!-- Description Column -->
            <ng-container matColumnDef="description">
              <th mat-header-cell *matHeaderCellDef>Description</th>
              <td
                mat-cell
                *matCellDef="let element"
                class="description-col td-ellipsis"
                [ngxTippy]="fullDescription"
                [tippyProps]="{ placement: 'right', interactive: true }"
                tippyName="content2"
              >
                <p>{{ element.description }}</p>
                <ng-template #fullDescription let-name class="t-template">
                  <div class="help-info-tooltip">
                    <div class="heading-with-background">Description</div>
                    <p class="py-3 black-text">{{ element.description }}</p>
                    <button mat-button color="primary" class="px-0">
                      Learn more
                    </button>
                  </div>
                </ng-template>
              </td>
            </ng-container>
        
            <!-- Created Date Column -->
            <ng-container matColumnDef="created_at">
              <th mat-header-cell *matHeaderCellDef>Created On</th>
              <td mat-cell *matCellDef="let element">
                {{ element.created_at }}
              </td>
            </ng-container>
        
            <!-- Created Date Column -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let element" [ngClass]="element.status">
                {{ element.status }}
              </td>
            </ng-container>
        
            <!-- Created Date Column -->
            <ng-container matColumnDef="action">
              <th mat-header-cell *matHeaderCellDef class="text-right">Action</th>
              <td mat-cell *matCellDef="let element" class="text-right">
                <mat-icon
                  class="material-symbols-outlined"
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
        
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr
              mat-row
              *matRowDef="let row; columns: displayedColumns"
              [id]="row.id"
            ></tr>
          </table>
        </div>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<TableComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args

export const Table: Story = {
  args: {
    variant: 'primary',
  },
};

export const TableSecondary: Story = {
  args: {
    variant: 'secondary',
  },
  parameters: {
    storybook: {
      hideNoControlsWarning: true,
    },
    docs: {
      source: {
        code: `
        <div
  *ngIf="ProductData.length == 0"
  class="relative border-2 w-full h-full p-7 overflow-auto"
>
  <app-empty-listing [items]="emptyCoupons"></app-empty-listing>
</div>
<div
  *ngIf="ProductData.length > 0"
  class="relative main-bg border-2 w-full h-full py-6 pl-5 pr-6 overflow-auto logs-list"
>
  <!-- </div> -->
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
  </div>
</div>
         `,
      },
    },
    // sidebar: { disable: true },
    // sidebarHide: ['TableSecondary']
    // 'storybook-addon-storyshots': {
    //   variantLabel: '',
    // },
  },
};
