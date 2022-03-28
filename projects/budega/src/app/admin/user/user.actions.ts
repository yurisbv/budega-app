import { createAction, props } from '@ngrx/store';
import { UserActionsTypes } from './UserActionsTypes';
import {
  BudegaUser,
  NewBudegaEmployee,
  Role,
  UpdateBudegaUser
} from './models/models';
import { HttpErrorResponse } from '@angular/common/http';

export const loadBudegaUsers = createAction(
  UserActionsTypes.loadBudegaUsersAction
);

export const loadBudegaUsersSuccess = createAction(
  UserActionsTypes.loadBudegaUsersSuccessAction,
  props<{ budegaUserList: BudegaUser[] }>()
);

export const loadBudegaUsersFailure = createAction(
  UserActionsTypes.loadBudegaUsersFailureAction,
  props<{ error: HttpErrorResponse }>()
);

export const registerBudegaUser = createAction(
  UserActionsTypes.registerBudegaUserAction,
  props<{ budegaUser: BudegaUser }>()
);

export const registerBudegaUserSuccess = createAction(
  UserActionsTypes.registerBudegaUserSuccessAction
);

export const registerBudegaUserFailure = createAction(
  UserActionsTypes.registerBudegaUserFailureAction,
  props<{ error: HttpErrorResponse }>()
);

export const registerBudegaEmployee = createAction(
  UserActionsTypes.registerBudegaEmployeeAction,
  props<{ newBudegaEmployee: NewBudegaEmployee }>()
);

export const registerBudegaEmployeeSuccess = createAction(
  UserActionsTypes.registerBudegaEmployeeSuccessAction
);

export const registerBudegaEmployeeFailure = createAction(
  UserActionsTypes.registerBudegaEmployeeFailureAction,
  props<{ error: HttpErrorResponse }>()
);

export const loadBudegaUserToUpdate = createAction(
  UserActionsTypes.loadBudegaUserToUpdateAction,
  props<{ id: string }>()
);

export const loadBudegaUserToUpdateSuccess = createAction(
  UserActionsTypes.loadBudegaUserToUpdateSuccessAction,
  props<{ editingBudegaUser: BudegaUser }>()
);

export const loadBudegaUserToUpdateFailure = createAction(
  UserActionsTypes.loadBudegaUserToUpdateFailureAction,
  props<{ error: HttpErrorResponse }>()
);

export const updateBudegaUser = createAction(
  UserActionsTypes.updateBudegaUserAction,
  props<{ updateBudegaUser: UpdateBudegaUser }>()
);

export const activeBudegaUser = createAction(
  UserActionsTypes.activeBudegaUserAction,
  props<{ budegaUserId: string; active: boolean }>()
);

export const activeBudegaUserSuccess = createAction(
  UserActionsTypes.activeBudegaUserSuccessAction
);

export const activeBudegaUserFailure = createAction(
  UserActionsTypes.activeBudegaUserFailureAction,
  props<{ error: HttpErrorResponse }>()
);

export const updateBudegaUserSuccess = createAction(
  UserActionsTypes.updateBudegaUserSuccessAction
);

export const updateBudegaUserFailure = createAction(
  UserActionsTypes.updateBudegaUserFailureAction,
  props<{ error: HttpErrorResponse }>()
);

export const removeBudegaUser = createAction(
  UserActionsTypes.removeBudegaUserAction,
  props<{ budegaUserId: string }>()
);

export const removeBudegaUserSuccess = createAction(
  UserActionsTypes.removeBudegaUserSuccessAction
);

export const removeBudegaUserFailure = createAction(
  UserActionsTypes.removeBudegaUserFailureAction,
  props<{ error: HttpErrorResponse }>()
);

export const updateBudegaUserImage = createAction(
  UserActionsTypes.updateBudegaUserImageAction,
  props<{ budegaUser: BudegaUser; image: FormData }>()
);

export const updateBudegaUserImageSuccess = createAction(
  UserActionsTypes.updateBudegaUserImageSuccessAction
);

export const updateBudegaUserImageFailure = createAction(
  UserActionsTypes.updateBudegaUserImageFailureAction,
  props<{ error: HttpErrorResponse }>()
);

export const loadBudegaRoles = createAction(
  UserActionsTypes.loadBudegaRolesAction
);

export const loadBudegaRolesSuccess = createAction(
  UserActionsTypes.loadBudegaRolesSuccessAction,
  props<{ roles: Role[] }>()
);

export const loadBudegaRolesFailure = createAction(
  UserActionsTypes.loadBudegaRolesFailureAction,
  props<{ error: HttpErrorResponse }>()
);
