import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  map,
} from 'rxjs';
import { GetProduct, Product } from 'src/app/shared/constants/consants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productSubject = new BehaviorSubject<any>(null);
  private uploadImageSubject = new BehaviorSubject<any>(null);
  public product$ = this.productSubject.asObservable();
  error$ = new Subject<string>();

  constructor(private http: HttpClient) { }

  createProduct(product:Product): Observable<Product> {
    return this.http.post(`${environment.productData}`, product).pipe(
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
    return this.http.post(`${environment.uploadUrl}`, image).pipe(
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

  getProducts(PageNumber: number, limit: number, search: string): Observable<Product[]> {
    return this.http
      .get<any>(`${environment.productData}?page=${PageNumber}&limit=${limit}&search=${search}`)
      .pipe(
        map((res) => {
          this.productSubject.next(res.data);
          console.log('res', res.data);
          return res.data;

        }),
        catchError((err) => {
          console.log(err);
          throw err;
        })
      );
  }
  getProductById(id: string): Observable<GetProduct> {
    return this.http.get<any>(`${environment.productData}/${id}`).pipe(
      map((res) => {
        console.log("res", res)
        return res.data;
      }),

      catchError((err) => {
        console.log(err);
        throw err;
      })
    );

  }
  editProduct(productId: string, updatedProduct: any): Observable<Product> {
    const url = `${environment.productData}/{productId}?productId=${productId}`;
    return this.http.patch(url, updatedProduct).pipe(
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
}

