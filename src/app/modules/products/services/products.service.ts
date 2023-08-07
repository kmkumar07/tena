import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map } from 'rxjs';
import { GetProduct, Product } from 'src/app/shared/constants/consants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productSubject = new BehaviorSubject<any>(null);
  private uploadImageSubject = new BehaviorSubject<any>(null);
  private removeImageSubject = new BehaviorSubject<any>(null);
  public product$ = this.productSubject.asObservable();
  products = [];
  error$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  createProduct(product: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/products`, product, {
        withCredentials: true,
      })
      .pipe(
        map((res: any) => {
          this.productSubject.next(res.data);
          return res.data;
        }),

        catchError((err) => {
          console.log(err);
          this.error$.next(err.message);
          throw err;
        })
      );
  }
  uploadImage(image: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/blob/upload`, image, {
        withCredentials: true,
      })
      .pipe(
        map((data: any) => {
          this.uploadImageSubject.next(data);
          return data;
        }),

        catchError((err) => {
          console.log(err);
          this.error$.next(err.message);
          throw err;
        })
      );
  }

  removeImage(image: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/blob/deleteImage`, image, {
        withCredentials: true,
      })
      .pipe(
        map((data: any) => {
          this.removeImageSubject.next(data);
          return data;
        }),

        catchError((err) => {
          console.log(err);
          this.error$.next(err.message);
          throw err;
        })
      );
  }

  getProducts(
    PageNumber: number,
    limit: number,
    search: string,
    sortBy: 'name' | 'createdOn',
    sortOrder: 'asc' | 'desc'
  ): Observable<Product[]> {
    return this.http
      .get<any>(
        `${environment.apiUrl}/products?page=${PageNumber}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
        { withCredentials: true }
      )
      .pipe(
        map((res) => {
          this.productSubject.next(res.data);
          this.products = res.data;
          return res.data;
        }),
        catchError((err) => {
          console.log(err);
          throw err;
        })
      );
  }
  getProductById(id: string): Observable<GetProduct> {
    return this.http
      .get<any>(`${environment.apiUrl}/products/${id}`, {
        withCredentials: true,
      })
      .pipe(
        map((res) => {
          return res.data;
        }),

        catchError((err) => {
          console.log(err);
          throw err;
        })
      );
  }
  editProduct(productId: string, updatedProduct: any): Observable<Product> {
    const url = `${environment.apiUrl}/products/{productId}?productId=${productId}`;
    return this.http.put(url, updatedProduct, { withCredentials: true }).pipe(
      map((res: any) => {
        this.productSubject.next(res.data);
        return res.data;
      }),
      catchError((err) => {
        this.error$.next(err.message);
        throw err;
      })
    );
  }
  deleteProduct(id: string) {
    const url = `${environment.apiUrl}/products/${id}?productId=${id}`;
    return this.http.delete(url, { withCredentials: true }).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        console.log(err);
        throw err;
      })
    );
  }
}
