import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TranslateLoader } from "@ngx-translate/core";
import { Observable, catchError } from "rxjs";

export class CustomTranslateLoader implements TranslateLoader {
    contentHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'X-Skip-ApiPrefix-Interceptor': 'X-Skip-ApiPrefix-Interceptor',
    });
  
    constructor(private httpClient: HttpClient) {}
  
    getTranslation(lang: string): Observable<any> {
      const { origin } = window.location;
      const apiAddress = origin + `/assets/i18n/${lang}.json`;
      return this.httpClient
  
        .get(apiAddress, { headers: this.contentHeader })
  
        .pipe(
          catchError((_) =>
            this.httpClient.get(origin + `/assets/i18n/en.json`, {
              headers: this.contentHeader,
            })
          )
        );
    }
  }