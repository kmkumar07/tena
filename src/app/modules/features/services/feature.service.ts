import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, Subject } from 'rxjs';
import { Feature, GetFeature } from 'src/app/shared/constants/consants';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  private featureSubject = new BehaviorSubject<any>(null);
  public feature$ = this.featureSubject.asObservable();
  error$ = new Subject<string>();
  constructor(private http: HttpClient) {}

  addFeature(feature: any): Observable<Feature> {
    return this.http.post(`${environment.apiUrl}`, feature).pipe(
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
  
  getFeatures(PageNumber: number, limit: number): Observable<any[]> {
    return this.http
      .get<any>(`${environment.featureUrl}?page=${PageNumber}&limit=${limit}`)
      .pipe(
        map((res) => {
          this.featureSubject.next(res);          
          return res.data;
        }),
        catchError((err) => {
          console.log(err);
          throw err;
        })
      );
  }
  deleteFeature(id: any): Observable<any> {
    const url = `${environment.featureUrl}/{featureId}?featureId=${id}`;

    return this.http.delete(url).pipe(
      catchError((error: HttpErrorResponse) => {
        this.error$.next(error.message);
        throw error;
      })
    );
  }
  getFeatureById(id: string): Observable<GetFeature> {
    return this.http.get<any>(`${environment.apiUrl}/{id}?id=${id}`).pipe(
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
    const url = `${environment.apiUrl}?featureId=${featureId}`;
    return this.http.patch(url, updatedFeature).pipe(
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
