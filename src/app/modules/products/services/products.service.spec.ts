
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { environment } from 'src/environments/environment';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a product', () => {
    const product = {
      productId: 'pr1',
      name: 'pr1',
      description: 'i am demo',
      status: 'active',
      imageUrl: '',
    };
    service.createProduct(product).subscribe((response) => {
      expect(response).toEqual(product);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products`);
    expect(req.request.method).toBe('POST');
    req.flush({ data: product });
  });

  it('should get products', () => {
    const mockProducts = [
      {   productId: 'pr1', name: 'pr1', description: 'i am demo', status: 'active', imageUrl: '',createdOn: 'string',
      modifiedOn: 'string' },
      {   productId: 'pr1', name: 'pr1', description: 'i am demo', status: 'active', imageUrl: '',createdOn: 'string',
      modifiedOn: 'string' }
    ];

    const pageNumber = 1;
    const limit = 10;
    const search = '';
    const sortBy = 'name';
    const sortOrder = 'asc';

    service.getProducts(pageNumber, limit, search, sortBy, sortOrder).subscribe((response) => {
      expect(response).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/products?page=${pageNumber}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`
    );
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockProducts });
  });

  it('should get a product by ID', () => {
    const productId = '1';
    const mockProduct = { productId: 'pr1', name: 'pr1', description: 'i am demo', status: 'active', imageUrl: '',modifiedOn:'' }

    service.getProductById(productId).subscribe((response) => {
      expect(response).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products/${productId}`);
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockProduct });
  });

  // Add more unit tests for other methods in the ProductsService as needed.
});

