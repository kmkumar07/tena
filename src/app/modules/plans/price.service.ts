import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  private priceSubject = new BehaviorSubject<any>(null);
  public price$ = this.priceSubject.asObservable();
  error$ = new Subject<string>();

  constructor(private http: HttpClient) { }
  createPrice(price): Observable<any> {
    return this.http.post(`${environment.price}`, price).pipe(
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
}
