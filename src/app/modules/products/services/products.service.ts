import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { GetProduct, Product } from 'src/app/shared/constants/consants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productSubject = new BehaviorSubject<any>(null);
  baseUrl = environment.apiUrl;
  public product$ = this.productSubject.asObservable();
  products = [];
  error$ = new Subject<string>();

  constructor(private http: HttpClient, private apiService: ApiService) {}
  private croppedImageSource = new BehaviorSubject<string>('');
  private imageNameSource = new BehaviorSubject<string>('');

  croppedImage$ = this.croppedImageSource.asObservable();
  imageName$ = this.imageNameSource.asObservable();

  sendCroppedImage(croppedImage: string, imageName: string): void {
    this.croppedImageSource.next(croppedImage);
    this.imageNameSource.next(imageName);
  }
 
  uploadImage(image: any): Observable<any> {
    let path = `${this.baseUrl}/blob/upload`;
    return this.apiService.post(path, image);
  }

  removeImage(image: any): Observable<any> {
    let path = `${this.baseUrl}/blob/deleteImage`;
    return this.apiService.post(path,image);
  }
  createProduct(product: any): Observable<any> {
    let path = `${this.baseUrl}/products`;
    return this.apiService.post(path, product);
  }
  getProducts(
    PageNumber: number,
    limit: number,
    search: string,
    sortBy: 'name' | 'createdOn',
    sortOrder: 'asc' | 'desc'
  ): Observable<any> {
    let path = `${this.baseUrl}/products?page=${PageNumber}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
    return this.apiService.get(path);
  }

  getProductById(id: string): Observable<GetProduct> {
    let path = `${this.baseUrl}/products/${id}`;
    return this.apiService.get(path);
  }

  editProduct(productId: string, updatedProduct: any): Observable<Product> {
    let path = `${this.baseUrl}/products/{productId}?productId=${productId}`;
    return this.apiService.put(path, updatedProduct);
  }

  deleteProduct(id: string) {
    let path = `${this.baseUrl}/products/${id}?productId=${id}`;
    return this.apiService.delete(path);
  }
}
