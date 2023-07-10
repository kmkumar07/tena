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
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/shared/components/dialog-box/delete-confirmation/delete-confirmation.component';
import { CouponsDeleteSuccessComponent } from 'src/app/shared/components/dialog-box/coupons-delete-success/coupons-delete-success.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from 'src/app/core/services/global.service';

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
    'createdOn',
    'status',
    'action',
  ];

  featuresData = [];
  searchLength: number;
  totalNumberOfFeature: number;
  NumberOfPage: any = '';
  NumberOfLimit: any = '';
  selection = new SelectionModel<features>(true, []);
  emptyFeature = noFeatures;
  subscription: Subscription;
  data$ = this.featureService.feature$;
  elementId: number;
  data: any;
  PageNumber = 1;
  limit = 10;
  sortBy: 'name' | 'createdOn';
  sortOrder: 'asc' | 'desc';
  hasNextPage: boolean = false;
  totalPages: number = 0;
  dialogRef: any;
  search: string = '';
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchQuery: string;
  searchData = [];
  allFeaturesData: number = 0;
  private searchQueryChanged: Subject<string> = new Subject<string>();
  private searchSubscription: Subscription;

  /** Whether the number of selected elements matches the total number of rows. */

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.featuresData.length;
    return numSelected === numRows;
  }

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private featureService: FeatureService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private global: GlobalService,
  ) {}
  onSearchInput() {
    this.searchQueryChanged.next(this.searchQuery);
  }
  ngOnInit(): void {
    this.sortBy = 'createdOn';
    this.sortOrder = 'desc';
    
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
        this.search = value;
        this.getFeature(
          this.NumberOfPage,
          this.NumberOfLimit,
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
    this.global.showLoader();
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
          this.global.hideLoader();
          this.totalPages = Math.ceil(this.totalNumberOfFeature / limit);
          this.hasNextPage = PageNumber < this.totalPages;
          this.searchLength = data.length;
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
    this.global.showLoader();
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
          this.global.hideLoader();

          if (
            this.totalNumberOfFeature > this.allFeaturesData ||
            this.totalNumberOfFeature == 0
          ) {
            this.allFeaturesData = this.totalNumberOfFeature;            
          }
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

  deleteElementById(elementId: number) {
    this.featureService.deleteFeature(elementId).subscribe({
      next: (res) => {
        this.deleteSuccess(elementId);
      },
      error: (error: any) => {
        this.snackBar.open(error.error.message, '', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        })
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
}
