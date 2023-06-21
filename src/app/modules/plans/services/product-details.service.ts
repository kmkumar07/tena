import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map } from 'rxjs';
import { ProductVariant } from 'src/app/shared/constants/consants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  private productVariantSubject = new BehaviorSubject<any>(null);
  public productVariant$ = this.productVariantSubject.asObservable();
  error$ = new Subject<string>();

  constructor(private http: HttpClient) { }

  createProductVariant(productVariant: ProductVariant): Observable<ProductVariant> {
    return this.http.post(`${environment.productVariantApi}`, productVariant).pipe(
      map((res: any) => {
        this.productVariantSubject.next(res.data);
        return res.data;
      }),

      catchError((err) => {
        console.log(err);
        this.error$.next(err.message);
        throw err;
      })
    );
  }
}