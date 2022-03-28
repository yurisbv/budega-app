import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  exhaustMap,
  map,
  switchMap,
  tap
} from 'rxjs/operators';
import { ProductsActionsTypes } from './productsActionsTypes';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { LoadingBarActionTypes } from '../../shared/loading-bar/loadingBarActionsTypes';
import { NotificationService } from '../../core/notifications/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from '../../service/product/product.service';
import { ProductBrandService } from '../../service/product/product-brand.service';
import { ProductDepartmentService } from '../../service/product/product-department.service';
import { ProductCategoryService } from '../../service/product/product-category.service';

@Injectable()
export class ProductEffects {
  loadProductList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActionsTypes.loadProductsAction),
      switchMap(() =>
        this.productService.getProductList().pipe(
          map((productList) => ({
            type: ProductsActionsTypes.loadProductsSuccessAction,
            productList
          })),
          catchError((error) =>
            of({
              type: ProductsActionsTypes.loadProductsFailureAction,
              error
            })
          )
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActionsTypes.addProductAction),
      switchMap(({ newProduct }) =>
        this.productService.addProduct(newProduct).pipe(
          map((productId) => ({
            type: ProductsActionsTypes.addProductSuccessAction,
            productId
          })),
          catchError((error) =>
            of({
              type: ProductsActionsTypes.addProductFailureAction,
              error
            })
          )
        )
      )
    )
  );

  // reload product -> Redirect to products list
  removeProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActionsTypes.removeProductAction),
      switchMap(({ productId }) =>
        this.productService.removeProduct(productId).pipe(
          map(() => ({
            type: ProductsActionsTypes.removeProductSuccessAction
          })),
          catchError((error) =>
            of({
              type: ProductsActionsTypes.removeProductFailureAction,
              error
            })
          )
        )
      )
    )
  );

  beforeRemoveProduct$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ProductsActionsTypes.removeProductFailureAction,
          ProductsActionsTypes.removeProductSuccessAction,
          ProductsActionsTypes.updateProductFailureAction,
          ProductsActionsTypes.updateProductSuccessAction
        ),
        tap(() => this.router.navigateByUrl('/admin/produtos'))
      ),
    { dispatch: false }
  );

  // redirect to edit product after create
  // TODO: load product after 'eager load'

  beforeCreateGoToUpdateProductPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActionsTypes.addProductSuccessAction),
        exhaustMap(({ productId }) =>
          // @ts-ignore
          this.router.navigateByUrl(`/admin/produtos/${productId.id}`)
        )
      ),
    { dispatch: false }
  );

  loadProductToUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActionsTypes.loadProductToUpdateAction),
      switchMap(({ id }) =>
        forkJoin({
          product: this.productService.getProductByID(id),
          departments: this.productDepartmentService.getProductDepartmentList(),
          brands: this.productBrandService.getProductBrandList(),
          categories: this.productCategoryService.getProductCategoryList()
        }).pipe(
          map((editingProduct) => ({
            type: ProductsActionsTypes.loadProductToUpdateSuccessAction,
            editingProduct
          })),
          catchError((error) =>
            of({
              type: ProductsActionsTypes.loadProductToUpdateFailureAction,
              error
            })
          )
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActionsTypes.updateProductAction),
      switchMap(({ product }) =>
        this.productService.updateProduct(product).pipe(
          map(
            () => ({
              type: ProductsActionsTypes.updateProductSuccessAction
            }),
            catchError((error) =>
              of({
                type: ProductsActionsTypes.updateProductFailureAction,
                error
              })
            )
          )
        )
      )
    )
  );

  updateProductImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActionsTypes.updateProductImageAction),
      switchMap(({ product, image }) =>
        this.productService.updateProductImage(product, image).pipe(
          map(
            () => ({
              type: ProductsActionsTypes.updateProductImageSuccessAction
            }),
            catchError((error) =>
              of({
                type: ProductsActionsTypes.updateProductImageFailureAction,
                error
              })
            )
          )
        )
      )
    )
  );

  /* Notifications */
  addProductSuccessNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActionsTypes.addProductSuccessAction),
        map(() =>
          this.translateService
            .get('budega.product.add.success')
            .subscribe((res) => this.notificationService.success(res))
        )
      ),
    { dispatch: false }
  );

  addProductFailureNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActionsTypes.addProductFailureAction),
        map(() =>
          this.translateService
            .get('budega.product.add.failure')
            .subscribe((res) => this.notificationService.error(res))
        )
      ),
    { dispatch: false }
  );

  updateProductSuccessNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActionsTypes.updateProductSuccessAction),
        map(() =>
          this.translateService
            .get('budega.product.update.success')
            .subscribe((res) => this.notificationService.success(res))
        )
      ),
    { dispatch: false }
  );

  updateProductFailureNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActionsTypes.updateProductFailureAction),
        map(() =>
          this.translateService
            .get('budega.product.update.failure')
            .subscribe((res) => this.notificationService.error(res))
        )
      ),
    { dispatch: false }
  );

  removeProductSuccessNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActionsTypes.removeProductSuccessAction),
        map(() =>
          this.translateService
            .get('budega.product.remove.success')
            .subscribe((res) => this.notificationService.success(res))
        )
      ),
    { dispatch: false }
  );

  removeProductFailureNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActionsTypes.removeProductFailureAction),
        map(() =>
          this.translateService
            .get('budega.product.remove.failure')
            .subscribe((res) => this.notificationService.error(res))
        )
      ),
    { dispatch: false }
  );

  updateProductImageSuccessNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActionsTypes.updateProductImageSuccessAction),
        map(() =>
          this.translateService
            .get('budega.product.update.image.success')
            .subscribe((res) => this.notificationService.success(res))
        )
      ),
    { dispatch: false }
  );

  updateProductImageFailureNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActionsTypes.updateProductImageFailureAction),
        map(() =>
          this.translateService
            .get('budega.product.image.failure')
            .subscribe((res) => this.notificationService.error(res))
        )
      ),
    { dispatch: false }
  );

  /* Loading Bar */

  showLoadingBar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ProductsActionsTypes.updateProductImageAction,
        ProductsActionsTypes.addProductAction,
        ProductsActionsTypes.loadProductToUpdateAction,
        ProductsActionsTypes.loadProductsAction,
        ProductsActionsTypes.removeProductAction,
        ProductsActionsTypes.updateProductAction
      ),
      map(() => ({
        type: LoadingBarActionTypes.showIndeterminateLoading
      }))
    )
  );

  hideLoadingBar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ProductsActionsTypes.updateProductImageSuccessAction,
        ProductsActionsTypes.updateProductImageFailureAction,

        ProductsActionsTypes.addProductSuccessAction,
        ProductsActionsTypes.addProductFailureAction,

        ProductsActionsTypes.loadProductToUpdateSuccessAction,
        ProductsActionsTypes.loadProductToUpdateFailureAction,

        ProductsActionsTypes.removeProductSuccessAction,
        ProductsActionsTypes.removeProductFailureAction,

        ProductsActionsTypes.updateProductSuccessAction,
        ProductsActionsTypes.updateProductFailureAction,

        ProductsActionsTypes.loadProductsFailureAction,
        ProductsActionsTypes.loadProductsSuccessAction
      ),
      map(() => ({ type: LoadingBarActionTypes.hideIndeterminateLoading }))
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private productBrandService: ProductBrandService,
    private productDepartmentService: ProductDepartmentService,
    private productCategoryService: ProductCategoryService,
    private notificationService: NotificationService,
    private translateService: TranslateService,
    private router: Router
  ) {}
}
