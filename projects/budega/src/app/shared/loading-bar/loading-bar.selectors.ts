import { createSelector } from '@ngrx/store';
import { AppState, Model } from './model/model';

export const selectLoadingBar = (state: AppState) => state.loadingBar;

export const selectLoadingBarState = createSelector(
  selectLoadingBar,
  (state: Model) => state
);

export const selectLoadingBarShow = createSelector(
  selectLoadingBar,
  (state: Model) => state.show
);
