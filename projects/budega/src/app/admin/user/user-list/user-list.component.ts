import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  Input,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { BudegaUser } from '../models/models';
import { UserListDataSource } from './user-list-datasource';
import { environment } from '../../../../environments/environment';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActionsSubject, Store } from '@ngrx/store';
import { AppState } from '../user.selectors';
import { activeBudegaUser, loadBudegaUsers } from '../user.actions';
import { ofType } from '@ngrx/effects';
import { UserActionsTypes } from '../UserActionsTypes';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'budega-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('table') table: MatTable<BudegaUser>;
  @Input() userList: BudegaUser[];
  dataSource: UserListDataSource;
  translate: TranslateService;
  api = environment.api.url;
  destroyed$ = new Subject<boolean>();

  displayedColumns = [
    'created',
    'name',
    'image',
    'email',
    'role',
    'emailVerified',
    'active',
    'actions'
  ];

  constructor(
    translate: TranslateService,
    private _snackBar: MatSnackBar,
    private userStore: Store<AppState>,
    private actionsSubj: ActionsSubject
  ) {
    this.translate = translate;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    // this.userList$.subscribe((list) => {
    //   debugger;
    //   // this.dataSource = new UserListDataSource(list);
    //   this.table.renderRows();
    // });
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
    // this.table.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  toggleActive(event: MatSlideToggleChange, id: string) {
    event.source.checked = !event.checked;
    this.translate
      .get([
        !event.checked
          ? 'budega.user.inactive.toggle'
          : 'budega.user.active.toggle',
        'budega.yes'
      ])
      .subscribe((result) => {
        const [text, action] = Array.from(Object.values(result));
        this._snackBar
          .open(text, action, {
            duration: 5000,
            panelClass: ['custom-snack-bar']
          })
          .onAction()
          .subscribe(() => {
            this.userStore.dispatch(
              activeBudegaUser({ budegaUserId: id, active: event.checked })
            );
            this.actionsSubj
              .pipe(
                ofType(UserActionsTypes.activeBudegaUserSuccessAction),
                takeUntil(this.destroyed$)
              )
              .subscribe((res) => {
                this.userStore.dispatch(loadBudegaUsers());
                event.source.checked = event.checked;
              });
          });
      });
  }

  // TODO: need be removed
  formatLocal(date: number) {
    const d = new Date(date);
    return d.toLocaleDateString(this.translate.currentLang);
  }
}
