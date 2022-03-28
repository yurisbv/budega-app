import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
  ProductBrand,
  ProductCategory,
  ProductDepartment
} from '../../admin/product/models/models';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  api = environment.api;
  resource = 'categories';
  constructor(private httpClient: HttpClient) {}

  getProductCategoryList(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(
      `${this.api.url}/${this.resource}`,
      {
        reportProgress: true
      }
    );
  }

  updateProductCategory(category: ProductCategory): Observable<void> {
    const { _id, ...update } = category;
    return this.httpClient.put<void>(
      `${this.api.url}/${this.resource}/${_id}`,
      update,
      { reportProgress: true }
    );
  }
}
