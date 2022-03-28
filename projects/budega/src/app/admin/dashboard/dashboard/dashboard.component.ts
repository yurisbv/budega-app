import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { EChartsOption } from 'echarts';
import { Observable } from 'rxjs';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/animations/route.animations';
import { Item, Order } from '../../../public/order/order.model';
import { loadAdminOrders } from '../../orders/admin-orders.actions';
import { AppState as OrdersState, selectAdminOrdersList } from '../../orders/admin-orders.selectors';
import { Product } from '../../product/models/models';
import { loadProducts } from '../../product/product.actions';
import { AppState as ProductState, selectProductList } from '../../product/product.selectors';

@Component({
  selector: 'budega-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  orderList$: Observable<Order[]>;
  productList$: Observable<Product[]>;
  translate: TranslateService;
        // '#37A2DA',
        // '#32C5E9',
        // '#67E0E3',
        // '#9FE6B8',
        // '#FFDB5C',
        // '#ff9f7f',
        // '#fb7293',
        // '#E062AE',
        // '#E690D1',
        // '#e7bcf3',
        // '#9d96f5',
        // '#8378EA',
        // '#96BFFF'

  /*
   * TODO: adicionar gráficos (vendas, entregas, usuários, estoque)
   * pegar todas as orders
   * pegar todos os produtos
   *   */
  constructor(
    private adminOrdersStore: Store<OrdersState>,
    private productStore: Store<ProductState>,
    translate: TranslateService
  ) {
    this.orderList$ = this.adminOrdersStore.select(selectAdminOrdersList);
    this.productList$ = this.productStore.select(selectProductList);
    this.translate = translate
  }

  ngOnInit(): void {
    this.adminOrdersStore.dispatch(loadAdminOrders());
    this.productStore.dispatch(loadProducts());
  }

  ordersMoneyAmount(orders: Order[]): number {
    let amount = 0.0
    orders.forEach(
      (order: Order) => order.itemsList.forEach(
        (item: Item) =>
        amount += item.amount * order.items.find((prod: Product) => item.productId === prod._id).price
      )
    )
    return amount
  }

  pieChartOption(products: Product[]): EChartsOption {
    let outOfStock = 0
    products.map(p => {if(p.stock.status === 'OUT_OF_STOCK') outOfStock++})
    let inStock =0
    products.map(p => {if(p.stock.status === 'IN_STOCK') inStock++})
    let runningLow = 0
    products.map(p => {if(p.stock.status === 'RUNNING_LOW') runningLow++})
    return {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: {
          color: '#ccc'
        }
      },
      series: [
        {
          type: 'pie',
          data: [
            {
              value: outOfStock,
              name: 'Fora de estoque'
            },
            {
              value: runningLow,
              name: 'Acabando'
            },
            {
              value: inStock,
              name: 'Em estoque'
            }
          ],
          color: [
            '#fb7293',
            '#FFDB5C',
            '#9FE6B8'
          ],
          itemStyle: {
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
        }
      ]
    };
  }

  barChartOption(orders: Order[]): EChartsOption {
    const result = new Map<string, number>()
    orders.forEach( (order: Order) => {
      const date = new Date(order.timeline[0].date).toLocaleDateString(this.translate.currentLang)
      if(!result.get(date))
          result.set(date, 1)
      else
        result.set(date, result.get(date) + 1)}
    )
    return {
      xAxis: {
        type: 'category',
        data: Array.from(result.keys())
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: Array.from(result.values()),
          type: 'bar'
        }
      ]
    };
  }
}
