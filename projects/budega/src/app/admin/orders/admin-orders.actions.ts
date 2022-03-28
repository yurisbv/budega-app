import { createAction, props } from '@ngrx/store';
import { AdminOrdersActionsTypes } from './AdminOrdersActionsTypes';
import { HttpErrorResponse } from '@angular/common/http';
import {Order, ORDER_STATE} from '../../public/order/order.model';

export const loadAdminOrders = createAction(
  AdminOrdersActionsTypes.loadBudegaAdminOrdersAction
);

export const loadAdminOrdersSuccess = createAction(
  AdminOrdersActionsTypes.loadBudegaAdminOrdersSuccessAction,
  props<{ adminOrders: Order[] }>()
);

export const loadAdminOrdersFailure = createAction(
  AdminOrdersActionsTypes.loadBudegaAdminOrdersFailureAction,
  props<{ error: HttpErrorResponse }>()
);

export const updateAdminOrders = createAction(
  AdminOrdersActionsTypes.updateBudegaAdminOrdersAction,
  props<{ id: string, state: ORDER_STATE }>()
)

export const updateAdminOrdersSuccess = createAction(
  AdminOrdersActionsTypes.updateBudegaAdminOrdersSuccessAction,
  props<{ adminOrders: Order[] }>()
)


export const updateAdminOrdersFailure = createAction(
  AdminOrdersActionsTypes.updateBudegaAdminOrdersFailureAction,
  props<{ error: HttpErrorResponse }>()
);