import browser from 'browser-detect';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { environment as env } from '../../environments/environment';

import {
  authLogin,
  authLogout,
  authRegister,
  routeAnimations,
  LocalStorageService,
  selectIsAuthenticated,
  selectSettingsStickyHeader,
  selectSettingsLanguage,
  selectEffectiveTheme
} from '../core/core.module';
import {
  actionSettingsChangeAnimationsPageDisabled,
  actionSettingsChangeLanguage
} from '../core/settings/settings.actions';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AppState, selectCart } from '../public/public.selectors';
import { CartItem } from '../public/cart/cart.model';

@Component({
  selector: 'budega-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: any;

  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = 'assets/logo.png';
  isSmallScreen: boolean;
  sideNavOpened = true;
  // languages = ['en', 'de', 'sk', 'fr', 'es', 'pt-br', 'zh-cn', 'he'];
  languages = ['pt-br', 'en'];
  navigation = [
    { link: 'loja', label: 'budega.menu.store', roles: ['client', 'public'] },
    {
      link: 'admin/produtos',
      label: 'budega.menu.products',
      roles: ['manager', 'stockist']
    },
    { link: 'admin/painel', label: 'budega.menu.manager', roles: ['manager'] },
    { link: 'admin/usuarios', label: 'budega.menu.users', roles: ['manager'] },
    {
      link: 'admin/entregas',
      label: 'budega.menu.deliveries',
      roles: ['manager', 'delivery-person', 'stockist']
    },
    {
      link: '/compras',
      label: 'budega.menu.orders',
      roles: ['client']
    }
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'budega.menu.settings', roles: ['public'] }
  ];

  isAuthenticated$: Observable<boolean>;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;
  cart$: Observable<Map<string, CartItem>>;
  cartOrder = {
    link: 'carrinho',
    label: 'budega.menu.cart',
    roles: ['client']
  };

  constructor(
    private store: Store,
    private storageService: LocalStorageService,
    private publicStore: Store<AppState>,
    private breakpointObserver: BreakpointObserver
  ) {
    this.isSmallScreen =
      this.breakpointObserver.isMatched('(max-width: 830px)');
    if (this.isSmallScreen) this.sideNavOpened = false;
  }

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {
    this.storageService.testLocalStorage();
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        actionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }

    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.stickyHeader$ = this.store.pipe(select(selectSettingsStickyHeader));
    this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
    this.cart$ = this.publicStore.pipe(select(selectCart));
  }

  onLoginClick() {
    this.store.dispatch(authLogin());
  }

  onLogoutClick() {
    this.store.dispatch(authLogout());
  }

  onRegisterClick() {
    this.store.dispatch(authRegister());
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(actionSettingsChangeLanguage({ language }));
  }

  sideNavToggle() {
    this.sidenav.toggle();
    this.sideNavOpened = this.isSmallScreen ? false : !this.sideNavOpened;
  }

  getCartAmount(cart: Map<string, CartItem>): number {
    let amount = 0;
    amount = 0;
    if (cart) Array.from(cart.values()).map((a) => (amount += a.amount));
    return amount;
  }
}
