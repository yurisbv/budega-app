import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductBrand, ProductDepartment } from '../models/models';
import { ProductEditComponent } from '../product-edit/product-edit.component';

@Component({
  selector: 'budega-department-dialog',
  templateUrl: './department-dialog.component.html',
  styleUrls: ['./department-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentDialogComponent implements OnInit {
  // TODO: https://netbasal.com/how-to-implement-file-uploading-in-angular-reactive-forms-89a3fffa1a03
  // TODO: Dispatch action to save Brand

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    description: [''],
    image: ['']
  });

  constructor(
    public dialogRef: MatDialogRef<ProductEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDepartment,
    private fb: FormBuilder
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
