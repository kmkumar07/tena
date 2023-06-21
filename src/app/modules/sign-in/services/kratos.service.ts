import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, switchMap } from 'rxjs';
import { loginCredientials } from 'src/app/shared/constants/consants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class kratosService {

  constructor(private http: HttpClient) { }
  loginIdentity(payload: loginCredientials): Observable<any> {
    return this.http.get(`${environment.kratosUrl}/login/browser`, {
      withCredentials: true
    }).pipe(
      map((loginFlowResponse: any) => {
        const flowId = loginFlowResponse.id
        const csrf_token =loginFlowResponse.ui?.nodes[0].attributes.value;
        const modifiedPayload = { ...payload, csrf_token: csrf_token };

        return { flowId, modifiedPayload };
      }),
      catchError((error: any) => {
        console.error('error while getting login flowId:', error);
        throw error;
      }),
      switchMap(({ flowId, modifiedPayload }) => {
        return this.http.post(`${environment.kratosUrl}/login?flow=${flowId}`, modifiedPayload, {
          withCredentials: true,
           headers: {
            "Content-Type": "application/json",
          },
        }).pipe(
          map((loginResponse: any) => {
            return loginResponse;
          }),
          catchError((error: any) => {
            console.error('error while login:', error);
            throw error;
          })
        );
      })
    );
  }
}
