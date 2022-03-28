import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ProductsMainComponent } from './product/main/products-main.component';
import { AuthGuardService } from '../core/keycloak/auth-guard.service';
import { Product } from './product/models/models';
import { UsersMainComponent } from './user/main/users-main.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import {AdminOrdersComponent} from './orders/main/admin-orders.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'painel',
    pathMatch: 'full'
  },
  {
    path: 'painel',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'budega.admin.dashboard',
      roles: ['manager']
    }
  },
  {
    path: 'produtos',
    component: ProductsMainComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'budega.admin.products',
      roles: ['manager', 'stockist']
    }
  },
  {
    path: 'produtos/:id',
    component: ProductEditComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'budega.admin.product',
      roles: ['manager', 'stockist'],
      product: Product
    }
  },
  {
    path: 'usuarios',
    component: UsersMainComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'budega.admin.users',
      roles: ['manager']
    }
  },
  {
    path: 'usuarios/:id',
    component: UserEditComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'budega.admin.product',
      roles: ['manager'],
      product: Product
    }
  },
  {
    path: 'entregas',
    component: AdminOrdersComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'budega.admin.orders',
      roles: ['manager', 'stockist', 'delivery-person']
    }
  },
  // {
  //   path: 'compras/:id',
  //   component: UserEditComponent,
  //   canActivate: [AuthGuardService],
  //   data: {
  //     title: 'budega.admin.product',
  //     roles: ['manager', 'stockist', 'delivery-person'],
  //     order: Order
  //   }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AdminRoutingModule {}
