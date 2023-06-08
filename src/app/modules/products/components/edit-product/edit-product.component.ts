import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { DialogAnimationsDialog } from '../create-product/create-product.component';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { ProductsService } from '../../services/products.service';
import { Observable, Subscription, pipe, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessDialogComponent } from 'src/app/shared/components/dialog-box/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProductComponent implements OnInit {
  imageUrl: string = '';
  product$: Observable<any>;
  subscription: Subscription;
  productsData = [];
  postForm = this.formBuilder.group({
    productId: ['', Validators.required],
    name: ['', Validators.required],
    description: [''],
    status: [true],
    imageUrl: ['', Validators.required],
  });

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.productService.getProductById(id).subscribe((data) => {
      this.populateForm(data);
    });
  }

  onSubmit() {
    this.postForm.get('imageUrl')?.setValue(this.imageUrl);
    const status = this.postForm.value.status ? 'active' : 'disabled';
    const product = {
      ...this.postForm.value,
      status: status,
    };
    this.subscription = this.productService
      .editProduct(this.postForm.value.productId, product)
      .subscribe((data) => {
        console.log('subscribe', data);
        this.openSuccess();
        console.log()
        this.router.navigate([`/products/view-product/${data.productId}`]);
      });

    this.postForm.reset();
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(DialogAnimationsDialog, {
      width: '',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.componentInstance.saveSuccess.subscribe((imageUrl: string) => {
      this.imageUrl = imageUrl;
      console.log('akas', this.imageUrl);
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

  populateForm(res: any) {
    this.postForm.setValue({
      name: res.name,
      description: res.description,
      productId: res.productId,
      status: res.status,
      imageUrl: res.imageUrl,
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
