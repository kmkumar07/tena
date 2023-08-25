import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, Subject } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
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
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private apiService: ApiService) {}

  addFeature(feature: Feature): Observable<Feature> {
    let path = `${this.baseUrl}/feature`;
    return this.apiService.post(path, feature);
  }
  deleteFeature(featureId: number) {
    const url = `${this.baseUrl}/feature/${featureId}?featureId=${featureId}`;
    return this.apiService.delete(url);
  }
  getFeatureById(id: string) {
    const path = `${this.baseUrl}/feature/${id}`;
    return this.apiService.get(path);
  }
  updateFeature(featureId: string, updatedFeature: any) {
    let path = `${this.baseUrl}/feature?featureId=${featureId}`;
    return this.apiService.put(path, updatedFeature);
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
        `${environment.apiUrl}/feature?page=${PageNumber}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
        { withCredentials: true }
      )
      .pipe(
        map((res) => {
          this.featureSubject.next(res.data);
          this.features = res.data;
          return res.data;
        }),
        catchError((err) => {
          throw err;
        })
      );
  }
}
