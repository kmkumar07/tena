import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ProductListingComponent } from './product-listing.component';
import { ProductsService } from '../../../../modules/products/services/products.service';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';

describe('ProductListingComponent', () => {
  let component: ProductListingComponent;
  let fixture: ComponentFixture<ProductListingComponent>;
  let productService: ProductsService;
  let dialog: MatDialog;

  beforeEach(async () => {
    const productServiceMock = {
      getProducts: jasmine.createSpy('getProducts').and.returnValue(of({})),
      deleteProduct: jasmine.createSpy('deleteProduct').and.returnValue(of({})),
    };

    const dialogMock = {
      open: jasmine.createSpy('open').and.returnValue({ afterClosed: () => of({}) }),
    };

    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatSnackBarModule, MatSortModule, NoopAnimationsModule, SharedModule],
      declarations: [ProductListingComponent],
      providers: [
        { provide: ProductsService, useValue: productServiceMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListingComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProducts method on component initialization', () => {
    expect(productService.getProducts).toHaveBeenCalled();
  });

  it('should call getProducts method with correct parameters', () => {
    const expectedPageNumber = 1;
    const expectedLimit = 10;
    const expectedSearch = '';
    const expectedSortBy = 'createdOn';
    const expectedSortOrder = 'desc';

    expect(productService.getProducts).toHaveBeenCalledWith(
      expectedPageNumber,
      expectedLimit,
      expectedSearch,
      expectedSortBy,
      expectedSortOrder
    );
  });

  it('should call deleteProduct method and refresh the product list', () => {
    const productId = '123';

    spyOn(component, 'getProduct');

    component.sendElementId(productId);

    expect(productService.deleteProduct).toHaveBeenCalledWith(productId);
    expect(productService.getProducts).toHaveBeenCalled();
  });

  // Add more test cases as needed for other methods and functionalities of the component
});
