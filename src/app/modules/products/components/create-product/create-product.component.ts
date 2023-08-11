import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxTippyProps } from 'ngx-tippy-wrapper';
import { trigger, transition, animate, style } from '@angular/animations';
import { SuccessDialogComponent } from '../../../../shared/components/dialog-box/success-dialog/success-dialog.component';
import { DialogAnimaComponent } from '../../../../shared/components/dialog-box/dialog-anima/dialog-anima.component';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
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
export class CreateProductComponent implements OnInit {
  subscription: Subscription;
  @ViewChild('tippyTemplate', { read: ElementRef, static: true })
  tippyTemplate: ElementRef;
  tippyContent: NgxTippyProps = {};
  productForm: FormGroup;
  imageUrl: string = '';
  imageName: string = '';
  data: string = '';
  imagePath: string = '';
  uploadMessage: string = '';
  uploadSuccess: boolean = false;
  error: string;
  receivedCroppedImage: string;
  dialogRef: any;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public router: Router,
    private productService: ProductsService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.productService.croppedImage$.subscribe((croppedImage) => {
      // Handle cropped image data
      this.receivedCroppedImage = croppedImage;
    });

    this.productService.imageName$.subscribe((imageName) => {
      // Handle image name
      this.imageName = imageName;
    });

    this.productForm = this.formBuilder.group({
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
      imageUrl: [],
    });

    this.productForm.controls['name'].valueChanges.subscribe((value) => {
      const idValue = value?.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
      this.productForm.controls['productId'].setValue(idValue);
    });
  }

  isChecked(): boolean {
    const status = this.productForm.get('status')?.value;
    return status === 'active';
  }

  toggleStatus(checked: boolean): void {
    const newStatus = checked ? 'active' : 'draft';
    this.productForm.get('status')?.setValue(newStatus);
  }
  navigateToViewFeature(res: any) {
    // this.router.navigate(['']);
    this.router.navigate([`/products/view-product/${res.productId}`]);
  }

  onSubmit() {
    this.productForm.get('imageUrl')?.setValue(this.imageUrl);
    const status = this.productForm.value.status ? 'active' : 'draft';
    const product = {
      ...this.productForm.value,
      status: status,
    };
    this.subscription = this.productService.createProduct(product).subscribe({
      next: (res) => {
        this.openSuccess();
        this.navigateToViewFeature(res);
      },
      error: (error: any) => {
        this.error = error?.error?.message || 'Database error';
        this.snackBar.open(this.error, '', {
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

  startMessageTimer(): void {
    const duration = 5000;
    setTimeout(() => {
      this.uploadSuccess = false;
      this.uploadMessage = '';
    }, duration);
  }

  openDialog() {
    this.dialogRef = this.dialog.open(DialogAnimaComponent, {
      width: '700px',
    });
    this.dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.imagePath = environment.blobStorage;

        this.uploadlogoSave();
      }
    });
  }
  async uploadlogoSave() {
    const payload = {
      image: this.receivedCroppedImage,
      imageName: this.imageName,
    };
    this.subscription = await this.productService
      .uploadImage(payload)
      .subscribe({
        next: (res) => {
          this.imageUrl = res.data.blobURL;
        },
      });
  }

  deleteImage() {
    const removeImagePayload = {
      image: this.imageUrl,
    };
    this.productService.removeImage(removeImagePayload).subscribe((res) => {
      this.imageUrl = res.data.blobURL;
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
        operation: 'is created',
      },
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  activeChecked(event){
    console.log(event);
  }
  cancel() {
    this.dialogRef.close();
  }
}
