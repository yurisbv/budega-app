import { createAction } from '@ngrx/store';
import { LoadingBarActionTypes } from './loadingBarActionsTypes';

export const actionShowIndeterminateLoadingBar = createAction(
  LoadingBarActionTypes.showIndeterminateLoading
);

export const actionHideIndeterminateLoadingBar = createAction(
  LoadingBarActionTypes.hideIndeterminateLoading
);
