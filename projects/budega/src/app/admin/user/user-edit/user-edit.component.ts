import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/animations/route.animations';
import { filter } from 'rxjs/operators';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Image } from '../../product/models/models';
import { Role } from '../models/models';
import { AppState, selectBudegaUserEditing } from '../user.selectors';
import {
  loadBudegaUserToUpdate,
  removeBudegaUser,
  updateBudegaUser,
  updateBudegaUserImage
} from '../user.actions';
import { MatDialog } from '@angular/material/dialog';
import { CropperImageDialogComponent } from '../../../shared/cropper-image-dialog/cropper-image-dialog.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'budega-edit-product',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditComponent implements AfterViewInit {
  @ViewChild('fileInput') fileInput: HTMLInputElement;
  @ViewChild('activeToggle') activeToggle: MatSlideToggle;
  @ViewChild('userImage') userImage: ElementRef<HTMLImageElement>;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  id: string;
  edit$: Observable<any>;
  roleListSelector: Array<Role> = [];
  form: FormGroup;
  imageData: FormData = undefined;
  userImageUrl: string;
  image: Image;
  api = environment.api.url;
  emailVerified = false;
  recheckEmail = false;
  resetPassword = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    public copperImageDialog: MatDialog
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(loadBudegaUserToUpdate({ id }));
    this.edit$ = this.store.pipe(
      select(selectBudegaUserEditing),
      filter((val) => val !== undefined)
    );
    this.form = fb.group({
      enabled: [false],
      id: ['', [Validators.required]],
      username: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      clientRoles: [null, [Validators.required]],
      image: [null]
    });
  }

  ngAfterViewInit(): void {
    this.edit$.subscribe(({ roles, budegaUser }) => {
      this.roleListSelector = roles;
      for (const [k, v] of Object.entries(budegaUser)) {
        if (this.form.controls[k]) this.form.controls[k].setValue(v);
        if (k === 'image') this.image = v as unknown as Image;
        if (k === 'clientRoles')
          this.form.controls['clientRoles'].setValue(v[0]);
      }
      if (budegaUser.attributes && budegaUser.attributes.avatar)
        this.userImageUrl = `${this.api}/${budegaUser.attributes.avatar}`;

      this.emailVerified = !!budegaUser.emailVerified;
    });

    this.form.controls['enabled'].valueChanges.subscribe(() =>
      this.canBeActive()
    );
  }

  /*
   * TODO: ADD BUTTON TO REQUIRE RESET PASSWORD
   * TODO: ADD BUTTON TO RE-CHECK EMAIL
   *  */

  save() {
    if (this.form.valid) {
      this.store.dispatch(
        updateBudegaUser({
          updateBudegaUser: {
            budegaUser: this.form.value,
            resetPassword: this.resetPassword,
            recheckEmail: this.recheckEmail
          }
        })
      );
    }

    if (this.imageData)
      this.store.dispatch(
        updateBudegaUserImage({
          budegaUser: this.form.value,
          image: this.imageData
        })
      );
  }

  // removeUser() {
  //   // add confirm dialog
  //   this.store.dispatch(
  //     removeBudegaUser({ budegaUserId: this.form.controls['id'].value })
  //   );
  // }

  canBeActive() {
    // verify minimum to be active
    // show warning if cant be active
    // if be active show success and active
    if (!this.activeToggle) return;
    if (!this.form.valid) {
      this.activeToggle.checked = false;
      console.error('cant be active');
    }
  }

  onFileChange(event: InputEvent) {
    const dialogRef = this.copperImageDialog.open(CropperImageDialogComponent, {
      data: { event }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userImage.nativeElement.src = URL.createObjectURL(result);
        this.userImage.nativeElement.hidden = false;
        this.imageData = new FormData();
        this.imageData.append(
          'image',
          result,
          this.form.controls['username'].value
        );
      }
    });
  }

  removeImage() {
    // TODO: add icon to remove image
  }

  customCompare(o1, o2) {
    return o1.id === o2.id;
  }
}
