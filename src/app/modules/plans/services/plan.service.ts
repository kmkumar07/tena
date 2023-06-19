import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, Subject } from 'rxjs';
import { Plan, PlanList } from 'src/app/shared/constants/consants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private planSubject = new BehaviorSubject<any>(null);
  public plan$ = this.planSubject.asObservable();
  plans: PlanList[] = [];
  error$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  addPlan(plan: any): Observable<Plan> {
    return this.http.post(`${environment.planUrl}`, plan).pipe(
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
    return this.http
      .get<any>(`${environment.planListUrl}?page=${PageNumber}&limit=${limit}`)
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
    const url = `${environment.planListUrl}/{productVariantId}?productVariantId=${id}`;
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
}
