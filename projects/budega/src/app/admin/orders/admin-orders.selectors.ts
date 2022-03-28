import { createSelector } from '@ngrx/store';
import {Order} from '../../public/order/order.model';

export interface AdminOrdersState {
  adminOrders: Order[];
}

export interface AppState {
  adminOrders: AdminOrdersState;
}

export const selectAdminOrders = (state: AppState) => state.adminOrders;

export const selectAdminOrdersList = createSelector(
    selectAdminOrders,
  (state: AdminOrdersState) => state.adminOrders
);
