import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, Subject } from 'rxjs';
import {
  Feature,
  FeatureList,
  GetFeature,
} from 'src/app/shared/constants/consants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  private featureSubject = new BehaviorSubject<any>(null);
  public feature$ = this.featureSubject.asObservable();
  features: FeatureList[] = [];
  error$ = new Subject<string>();
  constructor(private http: HttpClient) {}

  addFeature(feature: any): Observable<Feature> {
    return this.http.post(`${environment.apiUrl}/feature`, feature).pipe(
      map((res: any) => {
        this.featureSubject.next(res.data);
        return res.data;
      }),
      catchError((err) => {
        this.error$.next(err.message);
        throw err;
      })
    );
  }

  getFeatures(
    PageNumber: number,
    limit: number,
    search: string,
    sortBy: 'name' | 'createdOn',
    sortOrder: 'asc' | 'desc'
  ): Observable<FeatureList[]> {
    return this.http
      .get<any>(
        `${environment.apiUrl}/feature?page=${PageNumber}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`
      )
      .pipe(
        map((res) => {
          this.featureSubject.next(res.data);
          this.features = res.data;
          return res.data;
        }),
        catchError((err) => {
          console.log(err);
          throw err;
        })
      );
  }

  deleteFeature(id: number) {
    const url = `${environment.apiUrl}/feature/{featureId}?featureId=${id}`;
    return this.http.delete(url).pipe(
      map((res) => {
        this.features = this.features.filter(
          (feature) => feature.featureId !== id
        );
        this.featureSubject.next(this.features);
        return res;
      }),
      catchError((err) => {
        console.log(err);
        throw err;
      })
    );
  }
  getFeatureById(id: string): Observable<GetFeature> {
    return this.http
      .get<any>(`${environment.apiUrl}/feature/{featureId}?featureId=${id}`)
      .pipe(
        map((res) => {
          this.featureSubject.next(res);
          return res.data;
        }),
        catchError((err) => {
          this.error$.next(err.message);
          throw err;
        })
      );
  }

  updateFeature(featureId: string, updatedFeature: any): Observable<Feature> {
    const url = `${environment.apiUrl}/feature?featureId=${featureId}`;
    return this.http.put(url, updatedFeature).pipe(
      map((res: any) => {
        this.featureSubject.next(res.data);
        return res.data;
      }),
      catchError((err) => {
        this.error$.next(err.message);
        throw err;
      })
    );
  }
}
