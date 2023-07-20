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
    LogsData: { table: { disable: true } },
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
        <div>
        <div
          *ngIf="LogsData.length == 0"
          class="relative main-bg border-2 w-full h-full p-7 overflow-scroll"
        >
          <app-empty-listing [items]="emptyCoupons"></app-empty-listing>
        </div>
        <div
          *ngIf="LogsData.length > 0"
          class="relative main-bg border-2 w-full h-full py-6 pl-5 pr-6 overflow-scroll logs-list"
        >
          <!-- </div> -->
          <div class="primary-table overflow-visible mt-8 px-1 pb-2 table-wrapper">
            <table mat-table [dataSource]="LogsData">
              <!-- TimestampColumn -->
              <ng-container matColumnDef="Timestamp">
                <th mat-header-cell *matHeaderCellDef>Timestamp</th>
                <td mat-cell *matCellDef="let element">{{ element.Timestamp }}</td>
              </ng-container>
        
              <!-- Events Column -->
              <ng-container matColumnDef="Events">
                <th mat-header-cell *matHeaderCellDef>Events</th>
                <td mat-cell *matCellDef="let element">{{ element.Events }}</td>
              </ng-container>
        
              <!-- Description Column -->
              <ng-container matColumnDef="Customer_Info">
                <th mat-header-cell *matHeaderCellDef>Customer Info</th>
                <td mat-cell *matCellDef="let element">
                  <p>{{ element.Customer_Info }}</p>
                </td>
              </ng-container>
        
              <!-- Created Date Column -->
              <ng-container matColumnDef="Event_Source">
                <th mat-header-cell *matHeaderCellDef>Event Source</th>
                <td mat-cell *matCellDef="let element">
                  <span class="primary-light-6-bg p-1 border-1 text-primary">
                    {{ element.Event_Source }}
                  </span>
                </td>
              </ng-container>
        
              <tr mat-header-row *matHeaderRowDef="displayedColumns1"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns1"></tr>
            </table>
          </div>
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
