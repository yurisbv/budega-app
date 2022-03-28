import {
  Action,
  ActionReducerMap,
  createReducer,
  MetaReducer,
  on
} from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../admin/product/models/models';
import {
  addProductToCart,
  addProductToCartSuccess,
  loadClientCardSuccess,
  loadClientCart,
  loadClientOrderList,
  loadClientOrderListSuccess,
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
  removeProductFromCart,
  removeProductFromCartSuccess
} from './public.actions';
import { initPublicStateFromLocalStorage } from '../core/meta-reducers/init-state-from-local-storage.reducer';
import { AppState } from './public.selectors';
import { CartItem } from './cart/cart.model';
import { Order } from './order/order.model';

export const publicFeatureKey = 'public';

export const reducers: ActionReducerMap<AppState> = {
  public: publicReducer
};

export const metaReducers: MetaReducer<AppState>[] = [
  initPublicStateFromLocalStorage
];

export interface State {
  productList: Product[];
  cart: Map<string, CartItem>;
  orderList: Order[];
  error?: HttpErrorResponse;
}

export const initialState: State = {
  productList: [],
  cart: new Map<string, CartItem>(),
  orderList: []
};

export const reducer = createReducer(
  initialState,
  on(loadProducts, (state) => state),
  on(loadProductsSuccess, (state, { productList }) => ({
    ...state,
    productList
  })),
  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(addProductToCart, (state, { product }) => ({
    ...state,
    product
  })),
  on(addProductToCartSuccess, (state, { cart }) => ({
    ...state,
    cart
  })),
  on(removeProductFromCart, (state, { product }) => ({
    ...state,
    product
  })),
  on(removeProductFromCartSuccess, (state, { cart }) => ({
    ...state,
    cart
  })),
  on(loadClientCart, (state) => state),
  on(loadClientCardSuccess, (state, { cart }) => ({
    ...state,
    cart
  })),
  on(loadClientOrderList, (state) => state),
  on(loadClientOrderListSuccess, (state, { orderList }) => ({
    ...state,
    orderList
  }))
);

export function publicReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
