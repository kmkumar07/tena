import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FeatureService } from 'src/app/modules/features/services/feature.service';
import { MatDialog } from '@angular/material/dialog';
import { CouponsDeleteSuccessComponent } from 'src/app/shared/components/dialog-box/coupons-delete-success/coupons-delete-success.component';
import { DeleteConfirmationComponent } from 'src/app/shared/components/dialog-box/delete-confirmation/delete-confirmation.component';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
})
export class ViewProductComponent {
  product$: Observable<any>;
  subscription: Subscription;
  productDetail: any;
  productId: string;
  name: string;
  dialogRef: any;
  description: string;
  modifiedOn: string;
  createdOn: string;
  status: string;
  environment = environment;
  imageUrl: string;
  imagePath: string;
  imageName: string;
  feature: any;
  id: string;
  
  @ViewChild(SnackBarComponent, { static: false })
  snackbarComponent: SnackBarComponent;
  constructor(
    private productService: ProductsService,
    private featureService: FeatureService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productService.getProductById(this.id).subscribe((res) => {
      this.productDetail = res;
      this.productId = this.productDetail?.productId;
      this.name = this.productDetail?.name;
      this.description = this.productDetail?.description;
      this.createdOn = this.productDetail?.createdOn;
      this.modifiedOn = this.productDetail?.modifiedOn;
      this.status = this.productDetail?.status;
      (this.imageUrl = this.productDetail?.imageUrl),
        (this.imageName = this.imageUrl?.substring(
          this.imageUrl.lastIndexOf('/') + 1
        ));
      this.imagePath = this.environment.blobStorage;
      this.feature = this.productDetail?.feature || [];
    });
  }

  navigateToFeatures() {
    this.router.navigate(['/features/create/products/', this.id]);
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
    this.router.navigate(['/features']);
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

}
