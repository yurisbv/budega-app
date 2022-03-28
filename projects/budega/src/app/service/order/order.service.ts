import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, OrderAddress, ORDER_STATE } from '../../public/order/order.model';
import { CartItem } from '../../public/cart/cart.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  api = environment.api;
  resource = 'orders';

  constructor(private httpClient: HttpClient) {}

  createOrder(items: CartItem[], orderAddress: OrderAddress): Observable<string> {
    const orderWithoutImage = [];
    items.forEach((i) => {
      orderWithoutImage.push({
        amount: i.amount,
        productId: i.product._id
      });
    });
    return this.httpClient.post<string>(
      `${this.api.url}/${this.resource}`,
      { itemsList: orderWithoutImage, orderAddress: orderAddress },
      { reportProgress: true }
    );
  }

  getAll(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(
      `${this.api.url}/${this.resource}`
      );
  }

  updateOrder(id: string, state: ORDER_STATE): Observable<Order[]> {
    return this.httpClient.post<Order[]>(
      `${this.api.url}/${this.resource}/${id}`,
      {state}
    )
  }
}
