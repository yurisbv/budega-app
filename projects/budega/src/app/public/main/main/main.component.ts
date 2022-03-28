import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import { Observable } from 'rxjs';
import { Product } from '../../../admin/product/models/models';
import {
  AppState,
  selectAvailableProducts,
  selectCart
} from '../../public.selectors';
import { Store } from '@ngrx/store';
import {
  addProductToCart,
  loadClientCart,
  loadProducts,
  removeProductFromCart
} from '../../public.actions';
import { CartItem } from '../../cart/cart.model';

@Component({
  selector: 'budega-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  productList$: Observable<Product[]>;
  cart$: Observable<Map<string, CartItem>>;

  constructor(private publicStore: Store<AppState>) {
    this.cart$ = this.publicStore.select(selectCart);
    this.productList$ = this.publicStore.select(selectAvailableProducts);
  }

  ngOnInit() {
    this.publicStore.dispatch(loadProducts());
    this.publicStore.dispatch(loadClientCart());
  }

  loadProductAmount(id: string, list: Map<string, CartItem>): number {
    const item = list.get(id);
    return item ? item.amount : 0;
  }
  addProduct(product: Product) {
    this.publicStore.dispatch(addProductToCart({ product }));
  }
  removeProduct(product: Product) {
    this.publicStore.dispatch(removeProductFromCart({ product }));
  }
}
