import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, Subject } from 'rxjs';
import { Plan, PlanList, ProductVariant } from 'src/app/shared/constants/consants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private planSubject = new BehaviorSubject<any>(null);
  public plan$ = this.planSubject.asObservable();
  private priceSubject = new BehaviorSubject<any>(null);
  public price$ = this.priceSubject.asObservable();
  plans: PlanList[] = [];
  error$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  addPlan(plan: any): Observable<Plan> {
    return this.http.post(`${environment.apiUrl}/plans`, plan).pipe(
      map((res: any) => {
        this.planSubject.next(res.data);
        return res.data;
      }),
      catchError((err) => {
        this.error$.next(err.message);
        throw err;
      })
    );
  }

  getPlanVariant(PageNumber: number, limit: number): Observable<PlanList[]> {
    return this.http.get<any>(`${environment.apiUrl}/productVariant/?page=${PageNumber}&limit=${limit}`)
      .pipe(
        map((res) => {
          this.planSubject.next(res.data);
          this.plans = res.data;
          return res.data;
        }),
        catchError((err) => {
          console.log(err);
          throw err;
        })
      );
  }

  deleteProductVariant(id: string) {
    const url = `${environment.apiUrl}/productVariant/{productVariantId}?productVariantId=${id}`;
    return this.http.delete(url).pipe(
      map((res) => {
        this.plans = this.plans.filter(
          (plan) => plan.productVariantId !== id
        );
        this.planSubject.next(this.plans);
        return res;
      }),
      catchError((err) => {
        console.log(err);
        throw err;
      })
    );
  }
  createPrice(price): Observable<any> {
    return this.http.post(`${environment.apiUrl}/pricing`, price).pipe(
      map((res: any) => {
        this.priceSubject.next(res.data);        
        return res.data;
      }),

      catchError((err) => {
        console.log(err);
        this.error$.next(err.message);
        throw err;
      })
    );
  }

  updateProductVariant(id: string, updatedProductVariant: any): Observable<ProductVariant> {
    const url = `${environment.apiUrl}/productVariant/?productVariantId=${id}`;
    return this.http.put(url, updatedProductVariant).pipe(
      map((res: any) => {
        this.planSubject.next(res.data);
        return res.data;
      }),
      catchError((err) => {
        this.error$.next(err.message);
        throw err;
      })
    );
  }

  getProductVariantById(id: string): Observable<ProductVariant> {
    return this.http.get<any>(`${environment.apiUrl}/productVariant/{productVariantId}?productVariantId=${id}`).pipe(
      map((res) => {
        this.planSubject.next(res.data);
        return res.data;
      }),
      catchError((err) => {
        this.error$.next(err.message);
        throw err;
      })
    );
  }
}
