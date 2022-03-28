import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../admin/product/models/models';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../core/core.module';
import { loadClientOrderList } from '../public.actions';
import { AppState, selectClientOrderList } from '../public.selectors';
import { Item, Order } from './order.model';

@Component({
  selector: 'budega-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  orderList$: Observable<Order[]>;

  constructor(
    private publicStore: Store<AppState>
  ) {
    this.orderList$ = this.publicStore.select(selectClientOrderList)
  }

  ngOnInit(): void {
    this.publicStore.dispatch(loadClientOrderList())
  }

  cancelOrder(id: string) {
    console.log('canceled', id)
  }

  getAmount(list: Array<Item>): number {
    let amount = 0
    list.forEach( i => amount+=i.amount)
    return amount
  }

  extractProductId(id: string) {
    return id.replace(/\D/g, '').slice(0,4)
  }

  productQuantity(product: Product, itemsList: Item[]): number {
    return itemsList.find( prod => prod.productId === product._id ).amount
  }

}
