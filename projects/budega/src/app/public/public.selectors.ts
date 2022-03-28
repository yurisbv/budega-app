import { createSelector, MetaReducer } from '@ngrx/store';
import { Product } from '../admin/product/models/models';
import { CartItem } from './cart/cart.model';
import { Order } from './order/order.model';



export interface PublicState {
  productList: Product[];
  cart: Map<string, CartItem>;
  orderList: Order[];
}

export interface AppState {
  public: PublicState;
}

export const selectPublic = (state: AppState) => state.public;

export const selectAvailableProducts = createSelector(
  selectPublic,
  (state: PublicState) => state.productList
);

export const selectCart = createSelector(
  selectPublic,
  (state: PublicState) => state.cart
);

export const selectClientOrderList = createSelector(
  selectPublic,
  (state: PublicState) => state.orderList
)