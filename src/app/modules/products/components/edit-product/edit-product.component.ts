import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { ProductsService } from '../../services/products.service';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessDialogComponent } from 'src/app/shared/components/dialog-box/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { DialogAnimaComponent } from 'src/app/shared/components/dialog-box/dialog-anima/dialog-anima.component';
import { GlobalService } from 'src/app/core/services/global.service';
import { Product } from 'src/app/shared/constants/consants';

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
  deleteBlob: boolean = false;
  uploadLogo: boolean = false;
  isImageUploaded: boolean = false;
  getProductImageUrl: string;
  removeImagePayload:any;
  environment = environment;
  imagePath: string;
  product$: Observable<any>;
  subscription: Subscription;
  productsData = [];
  status: boolean;
  imageUrlName: string;
  receivedCroppedImage: string;
  dialogRef: any;
  uploadMessage: string = '';
  uploadSuccess: boolean = false;
  PageNumber = 1;
  limit = 10;
  search: string = '';
  sortBy: 'name' | 'createdOn';
  sortOrder: 'asc' | 'desc';
  productsSearchDataLength: boolean = false;
  productsSearchData:Product[];
  productsWithTotal:any;
  showLoader =false;
  searchQuery: string;
  private searchQueryChanged: Subject<string> = new Subject<string>();
  private searchSubscription: Subscription;
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
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.productService.getProductById(id).subscribe((data) => {
      this.populateForm(data);
      this.getProductImageUrl = data.imageUrl;
      this.imagePath = this.environment.blobStorage;
      this.productService.croppedImage$.subscribe((croppedImage) => {
        this.receivedCroppedImage = croppedImage;
      });

      this.productService.imageName$.subscribe((imageName) => {
        this.imageName = imageName;
      });
    });
    this.setupSearchSubscription();
  }
  onSearchInput() {
    this.searchQueryChanged.next(this.searchQuery);
  }
  private setupSearchSubscription() {
    this.searchSubscription = this.searchQueryChanged
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe((value) => {
        this.search = value;
        if (this.search.length > 0) {
          this.showLoader = true;
          this.getSearchProduct(
            this.PageNumber,
            this.limit,
            this.search,
            this.sortBy,
            this.sortOrder
          );
        }
      });
  }
  
  getSearchProduct(
    PageNumber: number,
    limit: number,
    search: string,
    sortBy: 'name' | 'createdOn',
    sortOrder: 'asc' | 'desc'
  ) {
    this.productService
      .getProducts(
        PageNumber,
        limit,
        search,
        sortBy,
        sortOrder
      )
      .subscribe((data) => {
        if (data) {
          this.productsWithTotal = data;
          this.productsSearchData = this.productsWithTotal.products;
          this.productsSearchDataLength = false;

          if (this.search.length > 0) {
            this.productsSearchData.forEach((product) => {
              if (this.search === product.name) {
                this.productsSearchDataLength = true;
                return;
              }
            });
            this.showLoader = false;
          }
        }
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
    this.postForm.get('imageUrl')?.setValue(this.imageUrl);
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
          this.uploadLogo = true;
          this.deleteBlob = false;
        },
      });
  }

  deleteImage() {
    if (this.getProductImageUrl[0]!==" ") {
      const imageUrlparts = this.getProductImageUrl?.split('/saasframework/');
      const extractedImagePart = decodeURIComponent(imageUrlparts[1]);
      this.removeImagePayload = {
        image: extractedImagePart,
      };
    } else {
      const imageUrlparts = this.imageUrl?.split('/saasframework/');
      const extractedImagePart = decodeURIComponent(imageUrlparts[1]);
      this.removeImagePayload = {
        image: extractedImagePart,
      }
    }

 

    this.productService.removeImage(this.removeImagePayload).subscribe((res) => {
      this.imageName = res.data.blobURL;
      this.deleteBlob = res.data.deleteBlob;
      this.imageUrl = ' ';
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
  toggleStatus() {

    let currentStatus = this.postForm.get('status').value;
    this.postForm.get('status').setValue(!currentStatus);

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
