import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ProductBrand } from '../../admin/product/models/models';

@Injectable({
  providedIn: 'root'
})
export class ProductBrandService {
  api = environment.api;
  resource = 'brands';
  constructor(private httpClient: HttpClient) {}

  getProductBrandList(): Observable<ProductBrand[]> {
    return this.httpClient.get<ProductBrand[]>(
      `${this.api.url}/${this.resource}`,
      {
        reportProgress: true
      }
    );
  }

  updateProductBrand(brand: ProductBrand): Observable<void> {
    const { _id, ...update } = brand;
    return this.httpClient.put<void>(
      `${this.api.url}/${this.resource}/${_id}`,
      update,
      {
        reportProgress: true
      }
    );
  }
}
