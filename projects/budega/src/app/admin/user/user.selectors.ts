import { createSelector } from '@ngrx/store';
import { BudegaUser, Role } from './models/models';

export interface BudegaUserState {
  budegaUserList: BudegaUser[];
  roles: Role[];
  editingBudegaUser: {
    budegaUser: BudegaUser;
    roles: Role[];
  };
}

export interface AppState {
  user: BudegaUserState;
}

export const selectBudegaUsers = (state: AppState) => state.user;

export const selectBudegaUserList = createSelector(
  selectBudegaUsers,
  (state: BudegaUserState) => state.budegaUserList
);

export const selectBudegaRolesList = createSelector(
  selectBudegaUsers,
  (state: BudegaUserState) => state.roles
);

export const selectBudegaUserEditing = createSelector(
  selectBudegaUsers,
  (state: BudegaUserState) => state.editingBudegaUser
);
