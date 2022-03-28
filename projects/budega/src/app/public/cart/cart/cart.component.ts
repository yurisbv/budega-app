import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/animations/route.animations';
import { TranslateService } from '@ngx-translate/core';
import { select, Store } from '@ngrx/store';
import { AppState, selectCart } from '../../public.selectors';
import { Observable } from 'rxjs';
import { Product } from '../../../admin/product/models/models';
import {
  addProductToCart,
  createOrder,
  loadClientCart,
  removeProductFromCart
} from '../../public.actions';
import { CartItem } from '../cart.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'budega-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  cart$: Observable<Map<string, CartItem>>;
  form = this.fb.group({
    street: ['', [Validators.required, Validators.minLength(4)]],
    number: ['', [Validators.required]],
    cep: ['', [Validators.required]],
    district: ['', [Validators.required]]
  });
  /*
   * TODO: ADD ADDRESS SELECTOR
   * TODO: LISTAR ROTAS DA API
   *   */
  constructor(
    private translate: TranslateService,
    private publicStore: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.publicStore.dispatch(loadClientCart());
  }

  ngOnInit(): void {
    this.cart$ = this.publicStore.pipe(select(selectCart));
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

  cartArray(cart: Map<string, CartItem>): CartItem[] {
    return Array.from(cart.values());
  }


  finishOrder(items: CartItem[]) {
    this.publicStore.dispatch(createOrder({ items: items, orderAddress: this.form.value }));
  }

  getCartAmountValue(cart: Map<string, CartItem>): number {
    let amount = 0;
    Array.from(cart.values()).map((cartItem) => {
      amount += cartItem.amount * cartItem.product.price;
    });
    return amount;
  }

  save(){}
}
