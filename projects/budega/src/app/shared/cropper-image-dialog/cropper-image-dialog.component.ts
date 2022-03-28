import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  base64ToFile,
  ImageCroppedEvent,
  ImageTransform
} from 'ngx-image-cropper';

export interface CropperImageDialogData {
  event: InputEvent;
}

@Component({
  selector: 'budega-cropper-image-dialog',
  templateUrl: './cropper-image-dialog.component.html',
  styleUrls: ['./cropper-image-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CropperImageDialogComponent implements OnInit {
  result: Blob;
  imageChangeEvent: any;
  showCropper = false;
  transform: ImageTransform = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: CropperImageDialogData) {}

  ngOnInit(): void {
    this.imageChangeEvent = this.data.event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.result = base64ToFile(event.base64);
  }

  imageLoaded() {
    this.showCropper = true;
  }
}
