import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectLoadingBarState } from '../../loading-bar.selectors';
import { AppState, Model } from '../../model/model';

@Component({
  selector: 'budega-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingBarComponent implements OnInit {
  loadingBar$: Observable<Model>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.loadingBar$ = this.store.pipe(select(selectLoadingBarState));
  }
}
