import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FeatureService } from 'src/app/modules/features/services/feature.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/shared/components/dialog-box/delete-confirmation/delete-confirmation.component';
import { FeaturesPopupComponent } from 'src/app/shared/components/dialog-box/features-popup/features-popup.component';
import { GlobalService } from 'src/app/core/services/global.service';
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
  allproductDetail:any;
  descriptionlength:number
  constructor(
    private productService: ProductsService,
    private featureService: FeatureService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public router: Router,
    private global: GlobalService,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productService.getProductById(this.id).subscribe((res) => {
      if(res){
      this.allproductDetail = res;
      this.productDetail = this.allproductDetail.data;            
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

   } });
  
  }

  navigateToFeatures(productId) {
    const dialogRef = this.dialog.open(FeaturesPopupComponent, {
      data: {productId: productId},
      panelClass: 'dialog-curved',
    })
  }
  navigateToEditFeatures(feature,productId){
    
    const dialogRef = this.dialog.open(FeaturesPopupComponent, {
      data: {feature: feature,productId:productId},
      panelClass: 'dialog-curved',
    })
  }
  navigateToGetAllFeatures() {
    this.router.navigate(['/features']);
  }
  deleteElementById(elementId: number) {
    this.featureService.deleteFeature(elementId).subscribe({
      next: (res) => {
        this.global.showSnackbar(true, 'Feature deleted successfully');

      },
      error: (error: any) => {
        const errorMessage = error?.error?.message || 'Database error';
        this.global.showSnackbar(false, errorMessage);
      },
    });
  }

  openDelete(id: any) {
    this.dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      panelClass: 'dialog-curved',
      data: {
        module: 'feature',
      },
    });

    this.dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.deleteElementById(id);
      }
    });
  }

}
