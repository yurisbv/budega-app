import { createAction, props } from '@ngrx/store';
import { NewProduct, Product, ProductBrand, ProductId } from './models/models';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductsActionsTypes } from './productsActionsTypes';

export const loadProducts = createAction(
  ProductsActionsTypes.loadProductsAction
);

export const loadProductsSuccess = createAction(
  ProductsActionsTypes.loadProductsSuccessAction,
  props<{ productList: Product[] }>()
);

export const loadProductsFailure = createAction(
  ProductsActionsTypes.loadProductsFailureAction,
  props<{ error: HttpErrorResponse }>()
);

export const loadProductToUpdate = createAction(
  ProductsActionsTypes.loadProductToUpdateAction,
  props<{ id: string }>()
);

export const loadProductToUpdateSuccess = createAction(
  ProductsActionsTypes.loadProductToUpdateSuccessAction,
  props<{ editingProduct: Product }>()
);

export const loadProductToUpdateFailure = createAction(
  ProductsActionsTypes.loadProductToUpdateFailureAction,
  props<{ error: HttpErrorResponse }>()
);

export const addProduct = createAction(
  ProductsActionsTypes.addProductAction,
  props<{ newProduct: NewProduct }>()
);

export const addProductSuccess = createAction(
  ProductsActionsTypes.addProductSuccessAction,
  props<{ productId: ProductId }>()
);

export const addProductFailure = createAction(
  ProductsActionsTypes.removeProductFailureAction,
  props<{ error: HttpErrorResponse }>()
);

export const removeProduct = createAction(
  ProductsActionsTypes.removeProductAction,
  props<{ productId: string }>()
);

export const removeProductSuccess = createAction(
  ProductsActionsTypes.addProductSuccessAction
);

export const removedProductFailure = createAction(
  ProductsActionsTypes.removeProductFailureAction,
  props<{ error: HttpErrorResponse }>()
);

export const updateProduct = createAction(
  ProductsActionsTypes.updateProductAction,
  props<{ product: Product }>()
);

export const updateProductsSuccess = createAction(
  ProductsActionsTypes.updateProductSuccessAction
);

export const updateProductsFailure = createAction(
  ProductsActionsTypes.updateProductFailureAction,
  props<{ error: HttpErrorResponse }>()
);

export const updateProductImage = createAction(
  ProductsActionsTypes.updateProductImageAction,
  props<{ product: Product; image: FormData }>()
);

export const updateProductImageSuccess = createAction(
  ProductsActionsTypes.updateProductImageSuccessAction
);

export const updateProductImageFailure = createAction(
  ProductsActionsTypes.updateProductImageFailureAction,
  props<{ error: HttpErrorResponse }>()
);

export const loadProductBrandList = createAction(
  ProductsActionsTypes.loadProductBrandListAction
);

export const loadProductBrandsSuccess = createAction(
  ProductsActionsTypes.loadProductBrandListSuccessAction,
  props<{ productBrandList: ProductBrand[] }>()
);

export const loadProductBrandsFailure = createAction(
  ProductsActionsTypes.loadProductBrandListFailureAction,
  props<{ error: HttpErrorResponse }>()
);
