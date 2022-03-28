import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductBrand } from '../models/models';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductEditComponent } from '../product-edit/product-edit.component';

@Component({
  selector: 'budega-brand-dialog',
  templateUrl: './brand-dialog.component.html',
  styleUrls: ['./brand-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandDialogComponent implements OnInit {
  // TODO: Dispatch action to save Brand

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    description: [''],
    image: ['']
  });

  constructor(
    public dialogRef: MatDialogRef<ProductEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductBrand,
    private fb: FormBuilder
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
