import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  private featureSubject = new BehaviorSubject<any>(null);
  public feature$ = this.featureSubject.asObservable();
  error$ = new Subject<string>();
  constructor(private http: HttpClient) {}

  addFeature(feature: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}`, feature).pipe(
      map((data: any) => {
        this.featureSubject.next(data);
        return data;
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
}
