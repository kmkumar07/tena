import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productSubject = new BehaviorSubject<any>(null);
  private uploadImageSubject = new BehaviorSubject<any>(null);
  public product$ = this.productSubject.asObservable();
  error$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  createProduct(product: any): Observable<any> {
    return this.http.post(`${environment.productData}`, product).pipe(
      map((data: any) => {
        this.productSubject.next(data);
        console.log('aaa', data);
        return data;
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
        // console.log(data,"upload")
        return data;
      }),

      catchError((err) => {
        console.log(err);
        this.error$.next(err.message);
        throw err;
      })
    );
  }
}
