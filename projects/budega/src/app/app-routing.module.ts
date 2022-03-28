import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuardService } from './core/keycloak/auth-guard.service';
import { MainComponent } from './public/main/main/main.component';
import { ClientRegisterComponent } from './public/client-register/client-register.component';
import { CartComponent } from './public/cart/cart/cart.component';
import { OrderComponent } from './public/order/order.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loja',
    pathMatch: 'full'
  },
  {
    path: 'loja',
    component: MainComponent,
    data: { title: 'budega.menu.store' }
  },
  {
    path: 'registrar',
    component: ClientRegisterComponent,
    data: { title: 'budega.menu.register' }
  },
  {
    path: 'carrinho',
    component: CartComponent,
    canActivate: [AuthGuardService],
    data: { title: 'budega.menu.cart', roles: ['client'] }
  },
  {
    path: 'compras',
    component: OrderComponent,
    canActivate: [AuthGuardService],
    data: { title: 'budega.menu.client.orders', roles: ['client'] }
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: 'configuracoes',
    loadChildren: () =>
      import('./public/settings/settings.module').then((m) => m.SettingsModule)
  },
  {
    path: '**',
    redirectTo: 'loja'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule {}
