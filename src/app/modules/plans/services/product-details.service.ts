import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject} from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { ProductVariant } from 'src/app/shared/constants/consants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  private productVariantSubject = new BehaviorSubject<any>(null);
  public productVariant$ = this.productVariantSubject.asObservable();
  baseUrl = environment.apiUrl;

  error$ = new Subject<string>();

  constructor(private apiService: ApiService) {}

  createProductVariant(productVariant: ProductVariant): Observable<ProductVariant> {
    let path = `${this.baseUrl}/productVariant`;
    return this.apiService.post(path, productVariant);
  }

  getProductVariantById(id: string): Observable<ProductVariant> {
    const path = `${this.baseUrl}/productVariant/{productVariantId}?productVariantId=${id}`
    return this.apiService.get(path);
  }
}
