import { Component, OnInit } from '@angular/core';
// import { DialogAnimationsDialog } from '../create-product/create-product.component';
import { FormBuilder, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { ProductsService } from '../../services/products.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessDialogComponent } from 'src/app/shared/components/dialog-box/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { DialogAnimaComponent } from 'src/app/shared/components/dialog-box/dialog-anima/dialog-anima.component';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-100%)' })),
      ]),
    ]),
  ],
})
export class EditProductComponent implements OnInit {
  imageName: string = '';
  imageUrl: string = '';
  isImageUploaded: boolean = false;
  getProductImageUrl: string;
  environment = environment;
  imagePath: string;
  product$: Observable<any>;
  subscription: Subscription;
  productsData = [];
  status: boolean;
  imageUrlName: string;
  uploadMessage: string = '';
  uploadSuccess: boolean = false;
  postForm = this.formBuilder.group({
    productId: ['', Validators.required],
    name: [
      '',
      [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9\s]*$/),
      ],
    ],
    description: ['', Validators.maxLength(500)],
    status: [true],
    imageUrl: ['', Validators.required],
  });

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private global: GlobalService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.productService.getProductById(id).subscribe((data) => {
      this.populateForm(data);
      this.getProductImageUrl = data.imageUrl;
      this.imagePath = this.environment.blobStorage;
    });
  }
  startMessageTimer(): void {
    const duration = 5000;
    setTimeout(() => {
      this.isImageUploaded = false;
      this.uploadMessage = '';
    }, duration);
  }

  onSubmit() {
    this.global.showLoader();
    this.postForm.get('imageUrl')?.setValue(this.getProductImageUrl);
    const status = this.postForm.value.status ? 'active' : 'draft';
    const product = {
      ...this.postForm.value,
      status: status,
    };
    this.subscription = this.productService
      .editProduct(this.postForm.value.productId, product)
      .subscribe({
        next: (data) => {
          this.global.hideLoader();
          this.openSuccess();
          this.router.navigate([`/products/view-product/${data.productId}`]);
        },
        error: (error: any) => {
          this.snackBar.open(error.error.message, '', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        },
      });
  }
  onDelete() {
    this.router.navigate(['/products']);
  }

  openDialog() {
    this.dialog.open(DialogAnimaComponent, {
      width: '700px',
    });
  }

  // openDialog(
  //   enterAnimationDuration: string,
  //   exitAnimationDuration: string
  // ): void {
  //   const dialogRef = this.dialog.open(DialogAnimationsDialog, {
  //     width: '700px',
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //   });
  //   dialogRef.componentInstance.saveSuccess.subscribe(
  //     (data: { imageUrl: string; imageName: string }) => {
  //       this.getProductImageUrl = data.imageUrl;
  //       this.imageName = data.imageName;
  //       this.imagePath = environment.blobStorage;
  //       this.uploadSuccess = true;
  //       this.uploadMessage = 'Image upload successful';
  //       this.startMessageTimer();
  //     }
  //   );
  //   dialogRef.componentInstance.saveError.subscribe((res: any) => {
  //     this.uploadSuccess = false;
  //     this.uploadMessage = 'Image upload failed. Please try again.';
  //     this.startMessageTimer();
  //   });
  // }
  deleteImage() {
    const imageUrlparts = this.getProductImageUrl?.split('/saasframework/');
    const extractedImagePart = decodeURIComponent(imageUrlparts[1]);
    const removeImagePayload = {
      image: extractedImagePart,
    };
    this.productService.removeImage(removeImagePayload).subscribe((res) => {
      this.getProductImageUrl = res.data.blobURL;
      this.imageName = res.data.blobName;
      this.imagePath = '';
      this.uploadMessage = 'Image removed successfully.';
      this.startMessageTimer();
    });
  }

  openSuccess() {
    this.dialog.open(SuccessDialogComponent, {
      width: '420px',
      data: {
        module: 'Product',
        operation: 'is updated',
      },
    });
  }

  populateForm(res: any) {
    if (res.status === 'active') {
      this.status = true;
    } else if (res.status === 'draft') {
      this.status = false;
    }
    this.postForm.setValue({
      name: res.name,
      description: res.description,
      productId: res.productId,
      status: this.status,
      imageUrl: res.imageUrl,
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
