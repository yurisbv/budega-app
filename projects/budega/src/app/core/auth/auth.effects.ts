import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';

import { LocalStorageService } from '../local-storage/local-storage.service';

import { KeycloakService } from 'keycloak-angular';
import { KeycloakAuthGuard } from 'keycloak-angular';
import { CoreActionsTypes } from './coreActionsTypes';
import { AuthGuardService } from '../keycloak/auth-guard.service';

export const AUTH_KEY = 'AUTH';
export const USER_KEY = 'USER';

@Injectable()
export class AuthEffects {
  login = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CoreActionsTypes.authLogin),
        tap(() =>
          this.keycloakService
            .login()
            .then(() => ({ type: CoreActionsTypes.authLoginSuccess }))
        )
      ),
    { dispatch: false }
  );

  register = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CoreActionsTypes.authRegister),
        tap(() =>
          this.keycloakService
            .register({
              // locale: 'pt-BR'
              // redirectUri: 'http://localhost:4200'
            })
            .then(() => ({ type: CoreActionsTypes.authLoginSuccess }))
        )
      ),
    { dispatch: false }
  );

  loginSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CoreActionsTypes.authLoginSuccess),
        tap(({ user }) => {
          this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: true });
          this.localStorageService.setItem('USER_KEY', user);
        })
      ),
    { dispatch: false }
  );

  logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CoreActionsTypes.authLogout),
        tap(() => this.keycloakService.logout(window.location.origin))
      ),
    { dispatch: false }
  );

  logoutSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CoreActionsTypes.authLogoutSuccess),
        tap(() => {
          this.localStorageService.setItem(AUTH_KEY, {
            isAuthenticated: false
          });
          this.localStorageService.removeItem(USER_KEY);
        })
      ),
    { dispatch: false }
  );

  verifyLogged = createEffect(
    () =>
      this.actions$.pipe(
        ofType('@ngrx/router-store/request'),
        tap(() => this.keycloakGuardService.getUserInfo().then(() => {}))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private router: Router,
    private keycloakService: KeycloakService,
    private keycloakGuardService: AuthGuardService
  ) {}
}
