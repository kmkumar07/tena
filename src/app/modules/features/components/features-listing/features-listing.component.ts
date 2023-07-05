import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import {
  FeatureList,
  features,
  noFeatures,
} from 'src/app/shared/constants/consants';
import { FeatureService } from '../../services/feature.service';
import { MatPaginator } from '@angular/material/paginator';
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/shared/components/dialog-box/delete-confirmation/delete-confirmation.component';
import { CouponsDeleteSuccessComponent } from 'src/app/shared/components/dialog-box/coupons-delete-success/coupons-delete-success.component';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-features-listing',
  templateUrl: './features-listing.component.html',
  styleUrls: ['./features-listing.component.scss'],
})
export class FeaturesListingComponent implements OnInit {
  displayedColumns: string[] = [
    'featureId',
    'productName',
    'name',
    'type',
    'description',
    'createdOn',
    'status',
    'action',
  ];

  featuresData = [];
  totalNumberOfFeature: number = 0;
  NumberOfPage: any = '';
  NumberOfLimit: any = '';
  selection = new SelectionModel<features>(true, []);
  emptyFeature = noFeatures;
  subscription: Subscription;
  data$ = this.featureService.feature$;
  elementId: number;
  data: any;
  PageNumber = 1;
  limit = 5;
  sortBy: 'name' | 'createdOn';
  sortOrder: 'asc' | 'desc';
  hasNextPage: boolean = false;
  totalPages: number = 0;
  dialogRef: any;
  loading = false;
  search: string = '';
  filteredFeature: FeatureList[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchQuery: string;
  private searchQueryChanged: Subject<string> = new Subject<string>();
  private searchSubscription: Subscription;

  @ViewChild(SnackBarComponent, { static: false })
  snackbarComponent: SnackBarComponent;

  /** Whether the number of selected elements matches the total number of rows. */

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.featuresData.length;
    return numSelected === numRows;
  }

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private featureService: FeatureService,
    public dialog: MatDialog
  ) {}
  onSearchInput() {
    this.searchQueryChanged.next(this.searchQuery);
  }
  ngOnInit(): void {
    this.loading = true;
    this.getAllFeature(
      this.NumberOfPage,
      this.NumberOfLimit,
      this.search,
      this.sortBy,
      this.sortOrder
    );
    this.getFeature(
      this.PageNumber,
      this.limit,
      this.search,
      this.sortBy,
      this.sortOrder
    );
    this.searchSubscription = this.searchQueryChanged
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.loading = true;
        this.search = value;
        this.getFeature(
          this.PageNumber,
          this.limit,
          this.search,
          this.sortBy,
          this.sortOrder
        );
      });
  }

  getFeature(
    PageNumber: number,
    limit: number,
    search: string,
    sortBy: 'name' | 'createdOn',
    sortOrder: 'asc' | 'desc'
  ) {
    this.loading = true;
    this.featureService
      .getFeatures(
        this.PageNumber,
        this.limit,
        this.search,
        this.sortBy,
        this.sortOrder
      )
      .subscribe((data) => {
        if (data) {
          this.featuresData = data;
          this.filteredFeature = data;
          this.loading = false;
          this.totalPages = Math.ceil(this.totalNumberOfFeature / limit);
          this.hasNextPage = PageNumber < this.totalPages;
        }
      });
  }
  getAllFeature(
    PageNumber: string,
    limit: string,
    search: string,
    sortBy: 'name' | 'createdOn',
    sortOrder: 'asc' | 'desc'
  ) {
    this.loading = true;
    this.featureService
      .getFeatures(
        this.NumberOfPage,
        this.NumberOfLimit,
        this.search,
        this.sortBy,
        this.sortOrder
      )
      .subscribe((data) => {
        if (data) {
          this.totalNumberOfFeature = data.length;
          this.loading = false;
        }
      });
  }
  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
  onPrevious() {
    if (this.PageNumber > 1) {
      this.PageNumber--;
      this.getFeature(
        this.PageNumber,
        this.limit,
        this.search,
        this.sortBy,
        this.sortOrder
      );
    }
  }

  onNext() {
    this.PageNumber++;
    this.getFeature(
      this.PageNumber,
      this.limit,
      this.search,
      this.sortBy,
      this.sortOrder
    );
  }

  openSnackbar(message: string) {
    const config: MatSnackBarConfig = {
      duration: 5000,
    };
    this.snackbarComponent.open(message, config);
  }

  deleteElementById(elementId: number) {
    this.featureService.deleteFeature(elementId).subscribe({
      next: (res) => {
        this.deleteSuccess(elementId);
      },
      error: (error: any) => {
        this.openSnackbar(error.error.message);
      },
    });
  }

  deleteSuccess(id: any) {
    const dialogRef = this.dialog.open(CouponsDeleteSuccessComponent, {
      width: '422px',
      panelClass: 'dialog-curved',
      data: {
        module: 'Feature',
        deleteId: id,
      },
    });
    this.getAllFeature(
      this.NumberOfPage,
      this.NumberOfLimit,
      this.search,
      this.sortBy,
      this.sortOrder
    );
    this.getFeature(
      this.PageNumber,
      this.limit,
      this.search,
      this.sortBy,
      this.sortOrder
    );
  }

  openDelete(id: any) {
    this.dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '420px',
      panelClass: 'dialog-curved',
      data: {
        module: 'Feature',
        deleteId: id,
      },
    });

    this.dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.deleteElementById(id);
      }
    });
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.featuresData);
  }

  /** The label for the checkbox on the passed row */

  checkboxLabel(row?: features): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.feature_id + 1
    }`;
  }

  /** Announce the change in sort state for assistive technology. */

  announceSortChange(sortState: Sort) {
    this.sortBy = sortState.active as 'name' | 'createdOn';
    this.sortOrder = sortState.direction as 'asc' | 'desc';
    this.getFeature(
      this.PageNumber,
      this.limit,
      this.search,
      this.sortBy,
      this.sortOrder
    );
  }

  selectedRow(selectedID: string, event: any) {
    const selectedRow = document.getElementById(`${selectedID}`);

    if (selectedRow != null) {
      selectedRow.classList.toggle('selected-row');
    }

    event.stopPropagation();
  }

  selectAll(data: any[]) {
    if (this.isAllSelected()) {
      data.map((element: any) => {
        document.getElementById(element.id)?.classList.add('selected-row');
      });
    } else {
      data.map((element: any) => {
        document.getElementById(element.id)?.classList.remove('selected-row');
      });
    }
  }
}
