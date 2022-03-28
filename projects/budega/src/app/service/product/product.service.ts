import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
  NewProduct,
  Product,
  ProductId
} from '../../admin/product/models/models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  api = environment.api;
  resource = 'products';
  constructor(private httpClient: HttpClient) {}

  getProductList(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.api.url}/${this.resource}`, {
      reportProgress: true
    });
  }

  getProductByID(id: string): Observable<Product> {
    return this.httpClient.get<Product>(
      `${this.api.url}/${this.resource}/${id}`,
      {
        reportProgress: true
      }
    );
  }

  addProduct(newProduct: NewProduct): Observable<ProductId> {
    return this.httpClient.post<ProductId>(
      `${this.api.url}/${this.resource}`,
      newProduct,
      { reportProgress: true }
    );
  }

  updateProduct(product: Product): Observable<void> {
    const { _id, ...update } = product;
    return this.httpClient.put<void>(
      `${this.api.url}/${this.resource}/${_id}`,
      update,
      {
        reportProgress: true
      }
    );
  }

  updateProductImage(product: Product, image: FormData): Observable<void> {
    const { _id } = product;
    return this.httpClient.put<void>(
      `${this.api.url}/${this.resource}/image/${_id}`,
      image,
      {
        reportProgress: true
      }
    );
  }

  removeProduct(productId: string): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.api.url}/${this.resource}/${productId}`,
      {
        reportProgress: true
      }
    );
  }
}
