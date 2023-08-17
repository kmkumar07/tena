import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FeatureService } from 'src/app/modules/features/services/feature.service';
import { MatDialog } from '@angular/material/dialog';
import { CouponsDeleteSuccessComponent } from 'src/app/shared/components/dialog-box/coupons-delete-success/coupons-delete-success.component';
import { DeleteConfirmationComponent } from 'src/app/shared/components/dialog-box/delete-confirmation/delete-confirmation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeaturesPopupComponent } from 'src/app/shared/components/dialog-box/features-popup/features-popup.component';
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
  
  constructor(
    private productService: ProductsService,
    private featureService: FeatureService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public router: Router,
    private snackBar: MatSnackBar,
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
    const dialogRef = this.dialog.open(FeaturesPopupComponent, {
      width: '1113px',
      // height: 'calc(100vh - 140px)',
      panelClass: 'dialog-curved',
    })
    // this.router.navigate(['/features/create/products/', this.id]);
  }
  navigateToGetAllFeatures() {
    this.router.navigate(['/features']);
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
    this.navigateToGetAllFeatures();
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
