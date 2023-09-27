import { Product } from 'src/app/shared/constants/consants';
import {
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxTippyProps } from 'ngx-tippy-wrapper';
import { trigger, transition, animate, style } from '@angular/animations';
import { DialogAnimaComponent } from '../../../../shared/components/dialog-box/dialog-anima/dialog-anima.component';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { GlobalService } from 'src/app/core/services/global.service';

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
  imageUrl: string = ' ';
  imageName: string = '';
  data: string = '';
  showLoader = false;
  imagePath: string = '';
  deleteBlob: boolean = false;
  uploadMessage: string = '';
  uploadSuccess: boolean = false;
  error: string;
  receivedCroppedImage: string;
  dialogRef: any;
  PageNumber: any = '';
  limit: any = '';
  search: string = '';
  sortBy: 'name' | 'createdOn';
  sortOrder: 'asc' | 'desc';
  productsSearchDataLength: boolean = false;
  productsSearchData:Product[];
  productsWithTotal:any;
  searchQuery: string;
  private searchQueryChanged: Subject<string> = new Subject<string>();
  private searchSubscription: Subscription;
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public router: Router,
    private productService: ProductsService,
    private global: GlobalService,
  ) {}
 
  ngOnInit() {
    this.initializeForm();
    this.setupSearchSubscription();
   
    this.productService.croppedImage$.subscribe((croppedImage) => {
      this.receivedCroppedImage = croppedImage;
    });

    this.productService.imageName$.subscribe((imageName) => {
      this.imageName = imageName;
    });   
  }
  
  onSearchInput() {
    this.searchQueryChanged.next(this.searchQuery);
  }

  private initializeForm() {
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
      description: [' ', Validators.maxLength(500)],
      status: [true],
      imageUrl: [],
    });

    this.productForm.controls['name'].valueChanges.subscribe((value) => {
      const idValue = value?.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
      this.productForm.controls['productId'].setValue(idValue);
    });
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
      .subscribe((res) => {
        if (res) {
          this.productsWithTotal = res.data;
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
  
  toggleStatus() {

    let currentStatus = this.productForm.get('status').value;
    this.productForm.get('status').setValue(!currentStatus);

  }
  
  navigateToViewProduct(res: any) {
    this.router.navigate([`/products/view-product/${res.data.productId}`]);
  }

  onSubmit() {
    this.global.showLoader();
    if(this.imageUrl){
      this.productForm.get('imageUrl')?.setValue(this.imageUrl);
    }
    this.productForm.get('imageUrl')?.setValue(this.imageUrl);
    const status = this.productForm.value.status ? 'active' : 'draft';

    const product = {
      ...this.productForm.value,
      status: status,
    };

    this.subscription = this.productService.createProduct(product).subscribe({
      next: (res) => {
        this.global.showSnackbar(true, 'Product created successfully');
        this.global.hideLoader();
        this.navigateToViewProduct(res);
      },    
      error: (error: any) => {
        this.global.hideLoader();
        const errorMessage = error?.error?.message || 'Database error';
        this.global.showSnackbar(false, errorMessage);
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
          this.deleteBlob = false;
        },
      });
  }

  deleteImage() {
    const imageUrlparts = this.imageName?.split('/saasframework/');

    const extractedImagePart = decodeURIComponent(imageUrlparts[0]);
    const removeImagePayload = {
      image: extractedImagePart,
    };

    this.productService.removeImage(removeImagePayload).subscribe((res) => {
      this.imageName = res.data.blobURL;
      this.deleteBlob = res.data.deleteBlob;
      this.imageUrl = ' ';
      this.uploadMessage = 'Image removed successfully.';
      this.startMessageTimer();
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.searchSubscription.unsubscribe();
      this.subscription.unsubscribe();
    }
  }
 
}
