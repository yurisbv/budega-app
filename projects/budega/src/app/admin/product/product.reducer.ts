import { Action, createReducer, on } from '@ngrx/store';
import { Product, ProductBrand } from './models/models';
import { HttpErrorResponse } from '@angular/common/http';
import {
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
  loadProductToUpdate,
  loadProductToUpdateFailure,
  loadProductToUpdateSuccess,
  updateProduct,
  updateProductsFailure,
  updateProductsSuccess
} from './product.actions';

export const productFeatureKey = 'product';

export interface State {
  productList: Product[];
  editingProduct?: Product;
  productBrandList?: ProductBrand[];
  error?: HttpErrorResponse;
}

export const initialState: State = {
  productList: []
};

const reducer = createReducer(
  initialState,
  on(loadProducts, (state) => state),
  on(loadProductsSuccess, (state, { productList }) => ({
    ...state,
    productList: productList
  })),
  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(loadProductToUpdate, (state, { id }) => ({ ...state, id })),
  on(loadProductToUpdateSuccess, (state, { editingProduct }) => ({
    ...state,
    editingProduct
  })),
  on(loadProductToUpdateFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(updateProduct, (state, { product }) => ({ ...state, product })),
  on(updateProductsSuccess, (state) => ({ ...state })),
  on(updateProductsFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function productReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
