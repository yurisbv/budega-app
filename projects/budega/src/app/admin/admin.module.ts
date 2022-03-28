import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductModule } from './product/product.module';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from './user/user.module';
import { NgxEchartsModule } from 'ngx-echarts';
import {OrdersModule} from './orders/orders.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ProductModule,
    SharedModule,
    UserModule,
    OrdersModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ]
})
export class AdminModule {}

/*
 * TODO: User
 *  - cart
 *  - cart history
 * TODO: DeliveryMan dashboard
 *  - delivery pending
 *  - my delivery
 *
 * TODO: Stockist dashboard
 *  - Waiting separation
 *  - Products resource
 *
 * TODO: Manager Dashboard
 *  - User resource
 *  - Products resource
 *  - Graphics statistics
 *  */
