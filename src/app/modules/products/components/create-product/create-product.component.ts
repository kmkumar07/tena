import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxTippyProps } from 'ngx-tippy-wrapper';
import { trigger, transition, animate, style } from '@angular/animations';
import { SuccessDialogComponent } from 'src/app/shared/components/dialog-box/success-dialog/success-dialog.component';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProductComponent implements OnInit {
  subscription: Subscription;
  @ViewChild('tippyTemplate', { read: ElementRef, static: true })
  tippyTemplate: ElementRef;
  tippyContent: NgxTippyProps = {};
  productForm: FormGroup;
  imageUrl: string = '';
  imageName:string='';
  data: string = '';
  imagePath: string = ''
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductsService,
  ) { }
  ngOnInit() {
    this.productForm = this.formBuilder.group({
      productId: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
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
    const newStatus = checked ? 'active' : 'disabled';
    this.productForm.get('status')?.setValue(newStatus);
  }

  onSubmit() {
    this.productForm.get('imageUrl')?.setValue(this.imageUrl);
    const status = this.productForm.value.status ? 'active' : 'disabled';
    const product = {
      ...this.productForm.value,
      status: status
    };
    this.subscription = this.productService
      .createProduct(product)
      .subscribe((res) => {
        console.log("akhand", res)
        this.openSuccess();
        this.router.navigate([`/products/view-product/${res.productId}`]);
      });

    this.productForm.reset();
  }

  // ngAfterViewInit() {
  //   this.setContentForTooltip();
  // }
  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(DialogAnimationsDialog, {
      width: '',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.componentInstance.saveSuccess.subscribe((data: { imageUrl: string, imageName: string }) => {
      this.imageUrl = data.imageUrl;
      this.imageName = data.imageName;
      this.imagePath = environment.imagePath
      console.log("aaaa", this.imageUrl)
    });
  }

  openSuccess() {
    this.dialog.open(SuccessDialogComponent, {
      width: '420px',
      data: {
        module: 'Plan',
      },
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // setContentForTooltip() {
  //   const template = this.tippyTemplate.nativeElement;

  //   // Pass element itself
  //   this.ngxTippyService.setContent('content', template);

  //   // or

  //   // Pass element `innerHTML`
  //   this.ngxTippyService.setContent('content', template.innerHTML);
  // }
}

@Component({
  selector: 'dialog-animations-dialog',
  templateUrl:
    '../../../../shared/components/dialog-box/dialog-animations-dialog.html',
  styleUrls: [
    '../../../../shared/components/dialog-box/dialog-animations.scss',
  ],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class DialogAnimationsDialog {
  subscription: Subscription;
  constructor(
    public dialogRef: MatDialogRef<DialogAnimationsDialog>,
    private productService: ProductsService
  ) { }
  activeColor: string = 'green';
  baseColor: string = '#ccc';
  overlayColor: string = 'rgba(255,255,255,0.5)';
  iconColor: string;
  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: string = '';
  base64imageData: string = '';
  imageName: string = '';
  imageUrl: string = '';
  
  
  

  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  handleDrop(e: any) {
    e.preventDefault();
    this.dragging = false;
    this.handleFileInput(e);
  }

  handleImageLoad() {
    this.imageLoaded = true;
    this.iconColor = this.overlayColor;
  }

  handleFileInput(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    this.loaded = false;
    this.imageName = file.name;
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e: any) {
    var reader = e.target;
    this.imageSrc = reader.result;
    const dataURLParts = this.imageSrc?.split(';base64,');
    this.base64imageData = dataURLParts[1];
    console.log("bbbb",this.base64imageData)
    this.loaded = true;
  }
  @Output() saveSuccess: EventEmitter<{ imageUrl: string, imageName: string }> = new EventEmitter<{ imageUrl: string, imageName: string }>();
  handleSave() {
    if (this.base64imageData) {
      const payload = {
        image: this.base64imageData,
        imageName: this.imageName,
      };
      this.subscription = this.productService
        .uploadImage(payload)
        .subscribe((res) => {
          this.imageUrl = res.data.blobURL;
          this.saveSuccess.emit({ imageUrl: this.imageUrl, imageName: this.imageName });
        });
    }
   
  }

  cancel() {
    this.imageSrc = 'null';
  }
}
