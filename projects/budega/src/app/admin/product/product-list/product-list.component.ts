import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductListDataSource } from './product-list-datasource';
import { Product } from '../models/models';
import { routeAnimations } from '../../../core/animations/route.animations';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'budega-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: [routeAnimations]
})
export class ProductListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Product>;
  @Input() productList: Product[];
  dataSource: ProductListDataSource;
  translate: TranslateService;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    // '_id',
    'name',
    'image',
    'brand',
    'department',
    'status',
    'active',
    'actions'
  ];

  constructor(translate: TranslateService) {
    this.translate = translate;
  }

  ngOnInit() {
    this.dataSource = new ProductListDataSource(Array.from(this.productList));
  }

  ngAfterViewInit() {
    this.translate
      .get([
        'budega.table.itemsperpagelabel',
        'budega.table.firstpagelabel',
        'budega.table.lastpagelabel',
        'budega.table.previouspagelabel',
        'budega.table.nextpagelabel'
      ])
      .subscribe((res) => {
        this.paginator._intl.itemsPerPageLabel =
          res['budega.table.itemsperpagelabel'];
        this.paginator._intl.firstPageLabel =
          res['budega.table.firstpagelabel'];
        this.paginator._intl.lastPageLabel = res['budega.table.lastpagelabel'];
        this.paginator._intl.previousPageLabel =
          res['budega.table.previouspagelabel'];
        this.paginator._intl.nextPageLabel = res['budega.table.nextpagelabel'];
      });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  remove(_id: string) {
    // TODO: Implement this
  }
}
