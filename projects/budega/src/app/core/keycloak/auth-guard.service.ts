import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { KeycloakService, KeycloakAuthGuard } from 'keycloak-angular';
import { Store } from '@ngrx/store';
import { JwtHelperService } from '@auth0/angular-jwt';
import { authLoginSuccess, authLogoutSuccess } from '../auth/auth.actions';
import { AuthState } from '../auth/auth.models';
import { User } from '../auth/auth.models';
import { environment } from '../../../environments/environment';

const helper = new JwtHelperService();

@Injectable()
export class AuthGuardService extends KeycloakAuthGuard {
  env = environment.keycloak;
  constructor(
    protected router: Router,
    protected keycloakAngular: KeycloakService,
    private store: Store<AuthState>
  ) {
    super(router, keycloakAngular);
  }

  async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise(async (resolve) => {
      let granted: boolean;
      if (!this.authenticated) {
        await this.keycloakAngular.login({
          redirectUri: window.location.origin + state.url
        });
      }
      // this.getUserInfo();
      const requiredRoles = route.data.roles;
      if (!requiredRoles || requiredRoles.length === 0) {
        return resolve(true);
      } else {
        if (!this.roles || this.roles.length === 0) {
          resolve(false);
        }
        for (const requiredRole of requiredRoles) {
          granted = this.keycloakAngular.isUserInRole(requiredRole);
          if (granted) {
            resolve(granted);
          }
        }
      }
      resolve(granted);
    });
  }

  async getUserInfo(): Promise<void> {
    let token: string;
    try {
      token = await this.keycloakAngular.getToken();
      let user: User;
      if (token) {
        const { email, name } = helper.decodeToken(token);
        user = {
          email: email,
          name: name
        };
        this.store.dispatch(authLoginSuccess({ user }));
      } else {
        this.store.dispatch(authLogoutSuccess());
      }
    } catch (e) {
      this.store.dispatch(authLogoutSuccess());
    }
  }

  async getUserRole(): Promise<string[]> {
    let token: string;
    try {
      token = await this.keycloakAngular.getToken();
      if (token) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { resource_access } = helper.decodeToken(token);
        if (!resource_access[this.env.clientId]) return ['public'];
        return resource_access[this.env.clientId].roles;
      } else {
        return ['public'];
      }
    } catch (e) {
      return ['public'];
    }
  }
}
