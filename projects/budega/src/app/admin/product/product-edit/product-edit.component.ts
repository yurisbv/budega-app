import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState, selectProductEditing } from '../product.selectors';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  Image,
  ProductBrand,
  ProductCategory,
  ProductDepartment,
  ProductStock,
  StockStatus
} from '../models/models';
import {
  loadProductToUpdate,
  updateProduct,
  updateProductImage,
  removeProduct
} from '../product.actions';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/animations/route.animations';
import { MatDialog } from '@angular/material/dialog';
import { BrandDialogComponent } from '../brand-dialog/brand-dialog.component';
import { filter } from 'rxjs/operators';
import { DepartmentDialogComponent } from '../department-dialog/department-dialog.component';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent
} from '@angular/material/autocomplete';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { debug } from '../../../core/meta-reducers/debug.reducer';

@Component({
  selector: 'budega-edit-product',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductEditComponent implements AfterViewInit {
  @ViewChild('fileInput') fileInput: HTMLInputElement;
  @ViewChild('categoriesInput') categoriesInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('activeToggle') activeToggle: MatSlideToggle;
  @ViewChild('productImage') productImage: ElementRef<HTMLImageElement>;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  id: string;
  edit$: Observable<any>;
  brandListSelector: Array<ProductBrand> = [];
  departmentListSelector: Array<ProductDepartment> = [];
  form: FormGroup;
  imageData: FormData = undefined;
  image: Image;
  status: StockStatus;

  categoriesVisible = true;
  categoriesSelectable = true;
  categoriesRemovable = true;
  categoriesAddOnBlur = true;
  readonly categoriesSeparatorKeysCodes: number[] = [ENTER, COMMA];
  categoriesList: Array<ProductCategory> = [];
  allCategoriesList: Array<ProductCategory> = [];

  realPattern = { '0': { pattern: new RegExp('[0-9]') } };

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    public departmentDialog: MatDialog,
    public brandDialog: MatDialog // private notificationService: NotificationService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(loadProductToUpdate({ id }));
    this.edit$ = this.store.pipe(
      select(selectProductEditing),
      filter((val) => val !== undefined)
    );
    this.form = fb.group({
      active: [false],
      _id: [''],
      name: ['', [Validators.required]],
      price: ['' || 0.0],
      brand: [''],
      department: [''],
      categories: [''],
      stockAmount: [0],
      stockMinimumAlert: [0]
    });
  }

  ngAfterViewInit(): void {
    this.edit$.subscribe(({ product, departments, brands, categories }) => {
      this.brandListSelector = brands;
      this.departmentListSelector = departments;
      this.allCategoriesList = categories;
      for (const [k, v] of Object.entries(product)) {
        if (this.form.controls[k]) this.form.controls[k].setValue(v);
        if (k === 'image') this.image = v as unknown as Image;
        if (k === 'stock' && v) {
          this.form.controls['stockAmount'].setValue(
            (v as unknown as ProductStock).amount
          );
          this.form.controls['stockMinimumAlert'].setValue(
            (v as unknown as ProductStock).minimumAlert
          );
          this.status = (v as unknown as ProductStock).status;
        }
        if (k === 'categories')
          this.categoriesList = v as unknown as ProductCategory[];
      }
    });
    this.form.controls['active'].valueChanges.subscribe(() =>
      this.canBeActive()
    );
  }

  save() {
    if (this.form.valid) {
      const p = this.form.value;
      p.categories = this.categoriesList;
      this.store.dispatch(updateProduct({ product: p }));
    }

    if (this.imageData)
      this.store.dispatch(
        updateProductImage({
          product: this.form.value,
          image: this.imageData
        })
      );
  }

  removeProduct() {
    // add confirm dialog
    this.store.dispatch(
      removeProduct({ productId: this.form.controls['_id'].value })
    );
  }

  canBeActive() {
    // verify minimum to be active
    // show warning if his can't be active
    // if be active show success and active
    if (!this.activeToggle) return;
    if (
      !(
        this.form.valid &&
        this.form.controls['price'].value > 0 &&
        this.form.controls['stockAmount'].value > 0 &&
        this.form.controls['stockMinimumAlert'].value > 0 &&
        this.form.controls['brand'].value !== undefined &&
        this.form.controls['department'].value !== undefined
      )
    ) {
      this.activeToggle.checked = false;
      console.error('cant be active');
    }
  }

  newBrand(): void {
    const dialogRef = this.brandDialog.open(BrandDialogComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.name) {
        this.brandListSelector = [result, ...this.brandListSelector];
        this.form.controls['brand'].setValue(result);
      }
    });
  }

  newDepartment(): void {
    const dialogRef = this.departmentDialog.open(DepartmentDialogComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.name) {
        this.departmentListSelector = [result, ...this.brandListSelector];
        this.form.controls['department'].setValue(result);
      }
    });
  }

  onFileChange(event: Event) {
    const file = (event.target as unknown as HTMLInputElement).files[0];
    if (file) {
      this.productImage.nativeElement.src = URL.createObjectURL(file);
      this.productImage.nativeElement.alt = file.name;
      this.imageData = new FormData();
      this.imageData.append('image', file, file.name);
    }
  }

  removeImage() {
    // remove Image
  }

  addCategory(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if (value.trim()) {
      this.allCategoriesList = [
        ...this.allCategoriesList,
        { name: value.trim() }
      ];
    }
    if (input) {
      input.value = '';
    }
  }

  selectedCategory(event: MatAutocompleteSelectedEvent): void {
    if (
      !this.categoriesList.filter((c) => c._id === event.option.value._id)
        .length
    ) {
      this.categoriesList = [...this.categoriesList, event.option.value];
      this.categoriesInput.nativeElement.value = '';
    }
  }

  removeCategory(category: ProductCategory): void {
    const index = this.categoriesList.indexOf(category);
    if (index) {
      this.categoriesList = Object.assign([], this.categoriesList);
      this.categoriesList.splice(index, 1);
    } else if (index === 0) {
      this.categoriesList = new Array<ProductCategory>();
    }
  }

  customCompare(o1, o2) {
    return o1.id === o2.id;
  }
}
