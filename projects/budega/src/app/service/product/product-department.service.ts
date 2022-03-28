import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ProductDepartment } from '../../admin/product/models/models';

@Injectable({
  providedIn: 'root'
})
export class ProductDepartmentService {
  api = environment.api;
  resource = 'departments';
  constructor(private httpClient: HttpClient) {}

  getProductDepartmentList(): Observable<ProductDepartment[]> {
    return this.httpClient.get<ProductDepartment[]>(
      `${this.api.url}/${this.resource}`,
      { reportProgress: true }
    );
  }

  updateProductDepartment(department: ProductDepartment): Observable<void> {
    const { _id, ...update } = department;
    return this.httpClient.put<void>(
      `${this.api.url}/${this.resource}/${_id}`,
      update,
      { reportProgress: true }
    );
  }
}
