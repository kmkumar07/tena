import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { features, noFeatures } from 'src/app/shared/constants/consants';
import { FeatureService } from '../../services/feature.service';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/shared/components/dialog-box/delete-confirmation/delete-confirmation.component';
@Component({
  selector: 'app-features-listing',
  templateUrl: './features-listing.component.html',
  styleUrls: ['./features-listing.component.scss'],
})
export class FeaturesListingComponent implements OnInit {
  displayedColumns: string[] = [
    //'select',
    'featureId',
  //  'product_name',
    'name',
    'description',
    'type',
    'createdOn',
    'status',
    'action',
  ];
  featuresData = [];
  selection = new SelectionModel<features>(true, []);
  emptyFeature = noFeatures;
  subscription: Subscription;
  data$ = this.featureService.feature$;
  elementId: number;
  data: any;
  PageNumber = 1;
  limit = 5;
  loading=true
  dialogRef: MatDialogRef<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

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

  ngOnInit(): void {
    this.getFeature(this.PageNumber, this.limit);
  }

  getFeature(PageNumber: number, limit: number) {
    this.featureService.getFeatures(this.PageNumber, this.limit).subscribe(() => {
      this.data$.subscribe((res) => {
        setTimeout(()=>{
          this.featuresData =res.data;
          this.loading = false
  
        },3000);
        
      });
    });
  }
  onPrevious() {
    if (this.PageNumber > 1) {
      this.PageNumber--;
      this.getFeature(this.PageNumber, this.limit);
    }
  }
  onNext() {
    this.PageNumber++;
    this.getFeature(this.PageNumber, this.limit);
  }
  sendElementId(elementId: number) {
    this.featureService.deleteFeature(elementId).subscribe(() => {
      this.data$.subscribe((data) => {
        console.log('data', data);
      });
      this.getFeature(this.PageNumber, this.limit);
    });
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    // console.log(this.selection.select)
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

  // ngAfterViewInit() {
  //   this.featuresData.sort = this.sort;
  // }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
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
  openDelete(id: any) {
    
    this.dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '420px',
      panelClass: 'dialog-curved',
    });

    this.dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.sendElementId(id);
      } else {
        console.log('Delete canceled');
      }
    });
  }
}
