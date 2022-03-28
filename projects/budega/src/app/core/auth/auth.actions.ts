import { createAction, props } from '@ngrx/store';
import { CoreActionsTypes } from './coreActionsTypes';
import { User } from './auth.models';

export const authLogin = createAction(CoreActionsTypes.authLogin);

export const authLoginSuccess = createAction(
  CoreActionsTypes.authLoginSuccess,
  props<{ user: User }>()
);

export const authRegister = createAction(CoreActionsTypes.authRegister);

export const authLogout = createAction(CoreActionsTypes.authLogout);

export const authLogoutSuccess = createAction(
  CoreActionsTypes.authLogoutSuccess
);
