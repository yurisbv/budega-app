import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import {Item, Order, ORDER_FINISHED, ORDER_STATE} from '../../../public/order/order.model';
import {AppState, selectAdminOrdersList} from '../admin-orders.selectors';
import {loadAdminOrders, updateAdminOrders} from '../admin-orders.actions';
import { TranslateService } from '@ngx-translate/core';
import { Product } from '../../product/models/models';

@Component({
  selector: 'budega-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminOrdersComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  orderList$: Observable<Order[]>;
  translate: TranslateService;

    // TODO: seção para destaque
    // ex: destaque do pedido que 'eu' estou separando
    // ex: separando

  constructor(
    private adminOrdersStore: Store<AppState>,
    translate: TranslateService
  ) {
    this.orderList$ = this.adminOrdersStore.select(selectAdminOrdersList)
    this.translate = translate;
  }

  ngOnInit(): void {
    this.adminOrdersStore.dispatch(loadAdminOrders())
  }

  cancelOrder(id: string) {
    console.log('canceled', id)
  }

 

  alterState(id: string, state: ORDER_STATE) {
    this.adminOrdersStore.dispatch(updateAdminOrders({ id: id, state: state}))
    // Captar para separação ou entrega
    // Send update dot in body { state: ORDER_STATE }
  }

  extractProductId(id: string) {
    return id.replace(/\D/g, '').slice(0,4)
  }

  productQuantity(product: Product, itemsList: Item[]): number {
    return itemsList.find( prod => prod.productId === product._id ).amount
  }
}
