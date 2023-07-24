import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateProductComponent } from './create-product.component';
import { ProductsService } from '../../services/products.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { HttpClient } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let productService: ProductsService;
  let dialog: MatDialog;
  let snackBar: MatSnackBar;
  let httpClient: HttpClient;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {
    const productServiceMock = jasmine.createSpyObj('ProductsService', [
      'createProduct',
    ]);
    const routeMock = {
      snapshot: {
        params: { id: '123' },
      },
    };

    const routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSnackBarModule,
        MatIconModule,
        RouterTestingModule,
        NgxTippyModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        
      ],
      declarations: [CreateProductComponent],
      providers: [
        MatDialog,
        HttpClient,
        MatSnackBar,
        Router,
        RouterTestingModule,

        { provide: ProductsService, useValue: productServiceMock },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: Router, useValue: routerMock },
      ]
        }).compileComponents();

    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    productService = TestBed.inject(ProductsService);
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    snackBar = TestBed.inject(MatSnackBar);
    httpClient = TestBed.inject(HttpClient);
    fixture.detectChanges();
  });

  it('should call ProductsService createProduct method with correct data', () => {
    const expectedData = {
      productId: 'pr1',
      name: 'pr1',
      description: 'i am demo',
      status: 'active',
      imageUrl: '',
    };

    // Set component input values
    component.productForm.patchValue(expectedData);

    // Configure the createProduct method of the mock service to return a resolved value
    (productService.createProduct as jasmine.Spy).and.returnValue(
      of(expectedData)
    );

    // Trigger the onSubmit method
    component.onSubmit();

    // Verify that the createProduct method was called with the expected data
    expect(productService.createProduct).toHaveBeenCalledWith(expectedData);
  });

  it('should handle ProductsService createProduct error', () => {
    const error = new Error('Database error');

    // Configure the createProduct method of the mock service to return an error
    (productService.createProduct as jasmine.Spy).and.returnValue(
      throwError(error)
    );

    // Trigger the onSubmit method
    component.onSubmit();

    // Verify that the component handles the error appropriately
    expect(component.error).toBe('Database error');
  });
  it('should navigate to the features view page with the correct product id', () => {
    const id = 'undefined';

    component.navigateToViewFeature(id);
    expect(router.navigate).toHaveBeenCalledWith([
      '/products/view-product/undefined'
    ]);
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
