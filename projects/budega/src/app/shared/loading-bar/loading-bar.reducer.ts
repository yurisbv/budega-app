import { Model, LoadingMode } from './model/model';
import { Action, createReducer, on } from '@ngrx/store';
import {
  actionShowIndeterminateLoadingBar,
  actionHideIndeterminateLoadingBar
} from './loading-bar.actions';

export const loadingBarFeatureKey = 'loadingBar';

export const initialState: Model = {
  show: false,
  mode: LoadingMode.indeterminate,
  value: null,
  bufferValue: null
};

const reducer = createReducer(
  initialState,
  on(actionShowIndeterminateLoadingBar, (state) => ({
    ...state,
    show: true
  })),
  on(actionHideIndeterminateLoadingBar, (state) => ({
    ...state,
    show: false
  }))
);

export function loadingBarReducer(state: Model | undefined, action: Action) {
  return reducer(state, action);
}
