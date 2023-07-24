import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { ViewProductComponent } from './view-product.component';
import { ProductsService } from '../../services/products.service';
import { FeatureService } from 'src/app/modules/features/services/feature.service';
import { MatIconModule } from '@angular/material/icon';
import { DeleteConfirmationComponent } from 'src/app/shared/components/dialog-box/delete-confirmation/delete-confirmation.component';

describe('ViewProductComponent', () => {
  let component: ViewProductComponent;
  let fixture: ComponentFixture<ViewProductComponent>;
  let productService: ProductsService;
  let featureService: FeatureService;
  let route: ActivatedRoute;
  let router: Router;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const productServiceMock = {
      getProductById: jasmine.createSpy('getProductById').and.returnValue(of({})),
    };

    const featureServiceMock = {
      deleteFeature: jasmine.createSpy('deleteFeature').and.returnValue(of({})),
    };

    const routeMock = {
      snapshot: {
        params: { id: '123' },
      },
    };

    const routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    const matDialogRefMock = {
      afterClosed: () => of(true),
    } as MatDialogRef<any>;

    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        MatIconModule,
        RouterTestingModule,
      ],
      declarations: [ViewProductComponent],
      providers: [
        { provide: ProductsService, useValue: productServiceMock },
        { provide: FeatureService, useValue: featureServiceMock },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: Router, useValue: routerMock },
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewProductComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService);
    featureService = TestBed.inject(FeatureService);
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    dialog.open.and.returnValue(matDialogRefMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call getProductById method on component initialization', () => {
    expect(productService.getProductById).toHaveBeenCalledWith('123');
  });

  it('should set productDetail with the returned value from getProductById', () => {
    const mockProductDetail = {
      productId: 'pr1',
      name: 'pr1',
      description: 'i am demo',
      status: 'active',
      imageUrl: '',
      modifiedOn: 'string',
    };
    (productService.getProductById as jasmine.Spy).and.returnValue(
      of(mockProductDetail)
    );
    component.ngOnInit();

    expect(component.productDetail).toEqual(mockProductDetail);
  });
  it('should navigate to the features create page with the correct product id', () => {
    component.id = '123';

    component.navigateToFeatures();

    expect(router.navigate).toHaveBeenCalledWith([
      '/features/create/products/',
      '123',
    ]);
  });
  it('should call deleteFeature method and navigate to features page', () => {
    const featureId = 456;

    spyOn(component, 'deleteSuccess');

    component.openDelete(featureId);

    expect(dialog.open).toHaveBeenCalledWith(DeleteConfirmationComponent, {
      width: '420px',
      panelClass: 'dialog-curved',
      data: {
        module: 'Feature',
        deleteId: featureId,
      },
    });
    expect(component.deleteSuccess).toHaveBeenCalledWith(featureId);
    component.navigateToGetAllFeatures();

  });

  // Add more test cases as needed for other methods and functionalities of the component
});
