import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../service/user/user.service';
import { AdminOrdersActionsTypes } from './AdminOrdersActionsTypes';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { LoadingBarActionTypes } from '../../shared/loading-bar/loadingBarActionsTypes';
import { NotificationService } from '../../core/notifications/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, of } from 'rxjs';
import { Router } from '@angular/router';
import {OrderService} from '../../service/order/order.service';

@Injectable()
export class AdminOrdersEffects {

    updateAdminOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminOrdersActionsTypes.updateBudegaAdminOrdersAction),
            exhaustMap(({ id, state }) =>
                this.orderService.updateOrder(id, state).pipe(
                    map((orderList) => ({
                        type: AdminOrdersActionsTypes.updateBudegaAdminOrdersSuccessAction,
                        orderList
                    })),
                    catchError(
                        map((err) => ({
                            type: AdminOrdersActionsTypes.updateBudegaAdminOrdersFailureAction,
                            err
                        }))
                    )
                )
            )
        )
    );

    loadAdminOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminOrdersActionsTypes.loadBudegaAdminOrdersAction),
            switchMap(() =>
                this.orderService.getAll().pipe(
                    map((adminOrders) => ({
                        type: AdminOrdersActionsTypes.loadBudegaAdminOrdersSuccessAction,
                        adminOrders
                    })),
                    catchError((error) =>
                        of({
                            type: AdminOrdersActionsTypes.loadBudegaAdminOrdersFailureAction,
                            error
                        })
                    )
                )
            )
        )
    );


  /* Notifications */


  // updateBudegaUserSuccessNotification$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(
  //         AdminOrdersActionsTypes.updateBudegaUserSuccessAction,
  //         AdminOrdersActionsTypes.updateBudegaUserImageSuccessAction
  //       ),
  //       map(() =>
  //         this.translateService
  //           .get('budega.user.update.success')
  //           .subscribe((res) => this.notificationService.success(res))
  //       )
  //     ),
  //   { dispatch: false }
  // );
  //


  /* Loading Bar */

  showLoadingBar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AdminOrdersActionsTypes.loadBudegaAdminOrdersAction,
      ),
      map(() => ({
        type: LoadingBarActionTypes.showIndeterminateLoading
      }))
    )
  );

  hideLoadingBar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        /* success */
        AdminOrdersActionsTypes.loadBudegaAdminOrdersSuccessAction,

        /* failures */
        AdminOrdersActionsTypes.loadBudegaAdminOrdersFailureAction
      ),
      map(() => ({ type: LoadingBarActionTypes.hideIndeterminateLoading }))
    )
  );

  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private notificationService: NotificationService,
    private translateService: TranslateService,
    private router: Router
  ) {}
}
