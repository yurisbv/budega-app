import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsMainComponent } from './main/products-main.component';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './product.effects';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { productFeatureKey, productReducer } from './product.reducer';
import { BrandDialogComponent } from './brand-dialog/brand-dialog.component';
import { DepartmentDialogComponent } from './department-dialog/department-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ProductEditComponent } from './product-edit/product-edit.component';

const maskConfig: Partial<IConfig> = {
  validation: true
};

@NgModule({
  declarations: [
    ProductEditComponent,
    ProductsMainComponent,
    ProductListComponent,
    BrandDialogComponent,
    DepartmentDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(productFeatureKey, productReducer),
    EffectsModule.forFeature([ProductEffects]),
    NgxMaskModule.forRoot(maskConfig),
    RouterModule,
    MatDialogModule,
    MatAutocompleteModule
  ],
  exports: [ProductListComponent, ProductEditComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductModule {}
