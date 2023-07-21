import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      observe: 'response',
      Authorization: '',
    };
    return new HttpHeaders(headersConfig);
  }

  private formatErrors(err: any) {
    console.log('api call error:: ', err);
    return throwError(err?.error);
  }

  // Get Method
  public get(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<any> {
    return this.http
      .get(`${path}`, { headers: this.setHeaders(), params: params })
      .pipe(catchError(this.formatErrors))
      .pipe(map((res: Response) => res));
  }

  // Post Method
  public post(path: string, body: any): Observable<any> {
    return this.http.post(`${path}`, body, { headers: this.setHeaders() }).pipe(
      catchError(this.formatErrors),
      map((res: Response) => res)
    );
  }

  // Put Method
  public put(path: string, body: any): Observable<any> {
    return this.http
      .put(`${path}`, body, { headers: this.setHeaders() })
      .pipe(catchError(this.formatErrors))
      .pipe(map((res: Response) => res));
  }

  // Delete Method
  public delete(path: string): Observable<any> {
    return this.http
      .delete(`${path}`, { headers: this.setHeaders() })
      .pipe(catchError(this.formatErrors))
      .pipe(map((res: Response) => res));
  }
}
