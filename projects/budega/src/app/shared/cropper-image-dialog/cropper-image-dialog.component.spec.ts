import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropperImageDialogComponent } from './cropper-image-dialog.component';

describe('CropperImageDialogComponent', () => {
  let component: CropperImageDialogComponent;
  let fixture: ComponentFixture<CropperImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CropperImageDialogComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CropperImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
