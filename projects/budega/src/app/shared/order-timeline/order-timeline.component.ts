import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { TranslateService } from '@ngx-translate/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../core/core.module';
import { OrderTimeline } from '../../public/order/order.model';

@Component({
  selector: 'budega-order-timeline',
  templateUrl: './order-timeline.component.html',
  styleUrls: ['./order-timeline.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: {displayDefaultIndicatorType: false},
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderTimelineComponent implements AfterViewInit {
  @Input() orderTimeline: OrderTimeline[];
  @ViewChild('stepper') stepper: MatStepper;
  translate: TranslateService;
  
  // Completar os elementos da timeline
  /*
  - pegar foto do entregador
  - 
  */
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  
  constructor(
    translate: TranslateService
  ) {
    this.translate = translate;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.stepper.selectedIndex = this.orderTimeline.length - 1
  }

  // TODO: need be removed
  formatLocal(date: number) {
    const d = new Date(date);
    return d.toLocaleDateString(this.translate.currentLang, {hour12: false, hour: '2-digit', minute: '2-digit' });
  }
}
