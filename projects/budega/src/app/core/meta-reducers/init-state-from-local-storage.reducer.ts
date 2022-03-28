import { ActionReducer, INIT, UPDATE } from '@ngrx/store';

import { LocalStorageService } from '../local-storage/local-storage.service';
import { AppState as CoreState } from '../core.state';
import { AppState as PublicState } from '../../public/public.selectors';

export function initCoreStateFromLocalStorage(
  reducer: ActionReducer<CoreState>
): ActionReducer<CoreState> {
  return function (state, action) {
    const newState = reducer(state, action);
    if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
      return { ...newState, ...LocalStorageService.loadInitialState() };
    }
    return newState;
  };
}

export function initPublicStateFromLocalStorage(
  reducer: ActionReducer<PublicState>
): ActionReducer<PublicState> {
  return function (state, action) {
    const newState = reducer(state, action);
    if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
      return { ...newState, ...LocalStorageService.loadInitialState() };
    }
    return newState;
  };
}
