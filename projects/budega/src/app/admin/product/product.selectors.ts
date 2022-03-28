import { createSelector } from '@ngrx/store';
import {
  Product,
  ProductBrand,
  ProductCategory,
  ProductDepartment
} from './models/models';

export interface ProductState {
  productList: Product[];
  editingProduct: {
    product: Product;
    brands: ProductBrand[];
    departments: ProductDepartment[];
    categories: ProductCategory[];
  };
  productBrandList: ProductBrand[];
}

export interface AppState {
  product: ProductState;
}

export const selectProducts = (state: AppState) => state.product;

export const selectProductList = createSelector(
  selectProducts,
  (state: ProductState) => state.productList
);

export const selectProductEditing = createSelector(
  selectProducts,
  (state: ProductState) => state.editingProduct
);

export const selectProductBrandList = createSelector(
  selectProducts,
  (state: ProductState) => state.productBrandList
);
