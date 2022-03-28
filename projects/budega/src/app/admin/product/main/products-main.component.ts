import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../models/models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectProductList } from '../product.selectors';
import { addProduct, loadProducts } from '../product.actions';
import { FormBuilder, Validators } from '@angular/forms';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';

@Component({
  selector: 'budega-products-main',
  templateUrl: './products-main.component.html',
  styleUrls: ['./products-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsMainComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  productList$: Observable<Product[]>;
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]]
  });

  // TODO: melhorar mensagem de erro no form do novo produto

  constructor(private productStore: Store<AppState>, private fb: FormBuilder) {
    this.productList$ = this.productStore.select(selectProductList);
  }

  ngOnInit(): void {
    this.productStore.dispatch(loadProducts());
  }

  save() {
    this.productStore.dispatch(addProduct({ newProduct: this.form.value }));
  }

  submit() {
    if (this.form.valid) {
      this.save();
    }
  }
}
