import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, Subject } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { Plan, ProductVariants } from 'src/app/shared/constants/consants';
import { environment } from 'src/environments/environment';
export class dataTypes {
  planInfo: {};
  priceInfo: [];
  productDetails: {};
}
@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private planSubject = new BehaviorSubject<any>(null);
  public editPrice = new BehaviorSubject<boolean>(false);
  public plan$ = this.planSubject.asObservable();
  private priceSubject = new BehaviorSubject<any>(null);
  public price$ = this.priceSubject.asObservable();
  private getPriceDataById = new Subject<any>();
  priceDataById$ = this.getPriceDataById.asObservable();
  public planData: dataTypes | any = {
    planInfo: new BehaviorSubject<any>({}),
    priceInfo: new BehaviorSubject<any[]>([]),
    productDetails: new BehaviorSubject<any>({}),
  };
  pricedata: any;
  plans: Plan[] = [];
  error$ = new Subject<string>();
  baseUrl = environment.apiUrl;
  priceModelArr = this.planData.priceInfo.getValue();

  constructor(private http: HttpClient, private apiService: ApiService) {}

  setEditPrice(state: any) {
    this.editPrice.next(state);
  }
  getEditPrice() {
    return this.editPrice.asObservable();
  }

  // Passing data from step to other steps
  setData(pricedata: any) {
    this.getPriceDataById.next(pricedata);
  }

  addPlan(plan: Plan): Observable<Plan> {
    let path = `${this.baseUrl}/plans`;
    return this.apiService.post(path, plan);
  }

  updatePlan(plan: Plan, planId: string) {
    let path = `${this.baseUrl}/plans/${planId}?planId=${planId}`;
    return this.apiService.put(path, plan);
  }

  getPlans(
    PageNumber: number,
    limit: number,
    search: string,
    sortBy: 'externalName' | 'createdOn',
    sortOrder: 'asc' | 'desc'
  ): Observable<any> {
    const path = `${this.baseUrl}/plans/?page=${PageNumber}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
    return this.apiService.get(path);
  }

  getPlanById(id: string) {
    const path = `${this.baseUrl}/plans/${id}?planId=${id}`;
    return this.apiService.get(path);
  }

  getPrice(PageNumber: number, limit: number, search: string): Observable<any> {
    const path = `${this.baseUrl}/pricing/?page=${PageNumber}&limit=${limit}&search=${search}`;
    return this.apiService.get(path);
  }

  getPriceById(id: string) {
    const path = `${this.baseUrl}/pricing/${id}?priceId=${id}`;
    return this.apiService.get(path);
  }

  deleteProductVariant(id: string) {
    const url = `${this.baseUrl}/productVariant/${id}?productVariantId=${id}`;
    return this.apiService.delete(url).pipe(
      map((res) => {
        return res;
      })
    );
  }
  deletePlan(planId: string) {
    const url = `${this.baseUrl}/plans/${planId}?planId=${planId}`;
    return this.apiService.delete(url);
  }
  createPrice(price): Observable<any> {
    let path = `${this.baseUrl}/pricing`;
    return this.apiService.post(path, price);
  }
  deletePrice(priceId: string) {
    const url = `${this.baseUrl}/pricing/${priceId}?priceId=${priceId}`;
    return this.apiService.delete(url);
  }
  updatePrice(price, priceId): Observable<any> {
    let path = `${this.baseUrl}/pricing/${priceId}?priceId=${priceId}`;
    return this.apiService.put(path, price);
  }
  updateProductVariant(
    id: string,
    updatedProductVariant: any
  ): Observable<ProductVariants> {
    const url = `${this.baseUrl}/productVariant/?productVariantId=${id}`;
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

  getProductVariantById(id: string): Observable<ProductVariants> {
    return this.http
      .get<any>(
        `${this.baseUrl}/productVariant/{productVariantId}?productVariantId=${id}`
      )
      .pipe(
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
