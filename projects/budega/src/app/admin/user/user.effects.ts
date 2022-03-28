import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../service/user/user.service';
import { UserActionsTypes } from './UserActionsTypes';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { LoadingBarActionTypes } from '../../shared/loading-bar/loadingBarActionsTypes';
import { NotificationService } from '../../core/notifications/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  registerBudegaUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionsTypes.registerBudegaUserAction),
      switchMap(({ client }) =>
        this.userService.addUserClient(client).pipe(
          map(() => ({
            type: UserActionsTypes.registerBudegaUserSuccessAction
          })),
          catchError((err) =>
            of({
              type: UserActionsTypes.registerBudegaUserFailureAction,
              err
            })
          )
        )
      )
    )
  );

  registerBudegaEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionsTypes.registerBudegaEmployeeAction),
      switchMap(({ newBudegaEmployee }) =>
        this.userService.addEmployee(newBudegaEmployee).pipe(
          map(() => ({
            type: UserActionsTypes.registerBudegaEmployeeSuccessAction
          })),
          catchError((err) =>
            of({
              type: UserActionsTypes.registerBudegaEmployeeFailureAction,
              err
            })
          )
        )
      )
    )
  );

  loadBudegaUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionsTypes.loadBudegaUsersAction),
      switchMap(() =>
        this.userService.getUserList().pipe(
          map((budegaUserList) => ({
            type: UserActionsTypes.loadBudegaUsersSuccessAction,
            budegaUserList
          })),
          catchError((error) =>
            of({
              type: UserActionsTypes.loadBudegaUsersFailureAction,
              error
            })
          )
        )
      )
    )
  );

  loadBudegaRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionsTypes.loadBudegaUsersAction),
      switchMap(() =>
        this.userService.getRoles().pipe(
          map((roles) => ({
            type: UserActionsTypes.loadBudegaRolesSuccessAction,
            roles
          })),
          catchError((error) =>
            of({
              type: UserActionsTypes.loadBudegaRolesFailureAction,
              error
            })
          )
        )
      )
    )
  );

  activeBudegaUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionsTypes.activeBudegaUserAction),
      switchMap(({ budegaUserId, active }) =>
        this.userService.activeUser(budegaUserId, active).pipe(
          map(() => ({
            type: UserActionsTypes.activeBudegaUserSuccessAction
          })),
          catchError((error) =>
            of({
              type: UserActionsTypes.activeBudegaUserFailureAction,
              error
            })
          )
        )
      )
    )
  );

  loadBudegaUserToUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionsTypes.loadBudegaUserToUpdateAction),
      switchMap(({ id }) =>
        forkJoin({
          roles: this.userService.getRoles(),
          budegaUser: this.userService.getUserById(id)
        }).pipe(
          map((editingBudegaUser) => ({
            type: UserActionsTypes.loadBudegaUserToUpdateSuccessAction,
            editingBudegaUser
          })),
          catchError((error) =>
            of({
              type: UserActionsTypes.loadBudegaUserToUpdateFailureAction,
              error
            })
          )
        )
      )
    )
  );

  updateBudegaUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionsTypes.updateBudegaUserAction),
      switchMap(({ updateBudegaUser }) =>
        this.userService.updateBudegaUser(updateBudegaUser).pipe(
          map(
            () => ({
              type: UserActionsTypes.updateBudegaUserSuccessAction
            }),
            catchError((error) =>
              of({
                type: UserActionsTypes.updateBudegaUserFailureAction,
                error
              })
            )
          )
        )
      )
    )
  );

  updateBudegaUserImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionsTypes.updateBudegaUserImageAction),
      switchMap(({ budegaUser, image }) =>
        this.userService.updateBudegaUserImage(budegaUser, image).pipe(
          map(
            () => ({
              type: UserActionsTypes.updateBudegaUserImageSuccessAction
            }),
            catchError((error) =>
              of({
                type: UserActionsTypes.updateBudegaUserImageFailureAction,
                error
              })
            )
          )
        )
      )
    )
  );

  /* Notifications */

  registerBudegaUserSuccessNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActionsTypes.registerBudegaUserSuccessAction),
        map(() =>
          this.translateService
            .get('budega.user.register.success')
            .subscribe((res) => this.notificationService.success(res))
        )
      ),
    { dispatch: false }
  );

  registerBudegaUserFailureNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActionsTypes.registerBudegaUserFailureAction),
        map(() =>
          this.translateService
            .get('budega.user.register.failure')
            .subscribe((res) => this.notificationService.error(res))
        )
      ),
    { dispatch: false }
  );

  activeBudegaUserSuccessNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActionsTypes.activeBudegaUserSuccessAction),
        map(() =>
          this.translateService
            .get('budega.user.active.success')
            .subscribe((res) => this.notificationService.success(res))
        )
      ),
    { dispatch: false }
  );

  activeBudegaUserFailureNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActionsTypes.activeBudegaUserFailureAction),
        map(() =>
          this.translateService
            .get('budega.user.inactive.success')
            .subscribe((res) => this.notificationService.error(res))
        )
      ),
    { dispatch: false }
  );

  updateBudegaUserSuccessNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          UserActionsTypes.updateBudegaUserSuccessAction,
          UserActionsTypes.updateBudegaUserImageSuccessAction
        ),
        map(() =>
          this.translateService
            .get('budega.user.update.success')
            .subscribe((res) => this.notificationService.success(res))
        )
      ),
    { dispatch: false }
  );

  updateBudegaUserFailureNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          UserActionsTypes.updateBudegaUserFailureAction,
          UserActionsTypes.updateBudegaUserImageFailureAction
        ),
        map(() =>
          this.translateService
            .get('budega.user.register.failure')
            .subscribe((res) => this.notificationService.error(res))
        )
      ),
    { dispatch: false }
  );

  beforeUpdateUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          UserActionsTypes.updateBudegaUserSuccessAction,
          UserActionsTypes.updateBudegaUserFailureAction
        ),
        tap(() => this.router.navigateByUrl('/admin/usuarios'))
      ),
    { dispatch: false }
  );

  registerBudegaEmployeeSuccessNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActionsTypes.registerBudegaEmployeeSuccessAction),
        map(() =>
          this.translateService
            .get('budega.employee.create.success')
            .subscribe((res) => this.notificationService.success(res))
        )
      ),
    { dispatch: false }
  );

  beforeCreateGoToUpdateEmployeePage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActionsTypes.registerBudegaEmployeeSuccessAction),
        exhaustMap(({ user }) =>
          this.router.navigateByUrl('/admin/usuarios/${user.id}')
        )
      ),
    { dispatch: false }
  );

  registerBudegaEmployeeFailureNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActionsTypes.registerBudegaEmployeeFailureAction),
        map(() =>
          this.translateService
            .get('budega.employee.create.failure')
            // TODO: escrever mensagem de error
            .subscribe((res) => this.notificationService.error(res))
        )
      ),
    { dispatch: false }
  );

  /* Loading Bar */

  showLoadingBar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        UserActionsTypes.registerBudegaUserAction,
        UserActionsTypes.loadBudegaUsersAction,
        UserActionsTypes.loadBudegaUserToUpdateAction,
        UserActionsTypes.updateBudegaUserAction,
        UserActionsTypes.updateBudegaUserImageAction,
        UserActionsTypes.activeBudegaUserAction,
        UserActionsTypes.registerBudegaEmployeeAction,
        UserActionsTypes.loadBudegaRolesAction
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
        UserActionsTypes.registerBudegaUserSuccessAction,
        UserActionsTypes.loadBudegaUsersSuccessAction,
        UserActionsTypes.loadBudegaUserToUpdateSuccessAction,
        UserActionsTypes.updateBudegaUserSuccessAction,
        UserActionsTypes.updateBudegaUserImageSuccessAction,
        UserActionsTypes.activeBudegaUserSuccessAction,
        UserActionsTypes.registerBudegaEmployeeSuccessAction,
        UserActionsTypes.loadBudegaRolesSuccessAction,

        /* failures */
        UserActionsTypes.registerBudegaUserFailureAction,
        UserActionsTypes.loadBudegaUsersFailureAction,
        UserActionsTypes.loadBudegaUserToUpdateFailureAction,
        UserActionsTypes.updateBudegaUserFailureAction,
        UserActionsTypes.updateBudegaUserImageFailureAction,
        UserActionsTypes.activeBudegaUserFailureAction,
        UserActionsTypes.registerBudegaEmployeeFailureAction,
        UserActionsTypes.loadBudegaRolesFailureAction
      ),
      map(() => ({ type: LoadingBarActionTypes.hideIndeterminateLoading }))
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private notificationService: NotificationService,
    private translateService: TranslateService,
    private router: Router
  ) {}
}
