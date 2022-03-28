import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { initializer } from './core/keycloak/init';
import { SharedModule } from './shared/shared.module';
import { MatBadgeModule } from '@angular/material/badge';

import { StoreModule } from '@ngrx/store';
import {
  publicFeatureKey,
  publicReducer  
} from './public/public.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PublicEffects } from './public/public.effects';
import { CommonModule } from '@angular/common';
import { MainComponent } from './public/main/main/main.component';
import { ClientRegisterComponent } from './public/client-register/client-register.component';
import { CartModule } from './public/cart/cart.module';
import {OrderComponent} from './public/order/order.component';
import {MatStepperModule} from '@angular/material/stepper';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { HasRoleModule } from './core/keycloak/has-role.module';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core
    CoreModule,

    // shared
    SharedModule,
    HasRoleModule,

    // app
    AppRoutingModule,

    // Keycloak
    KeycloakAngularModule,


    // public
    StoreModule.forFeature(publicFeatureKey, publicReducer),
    EffectsModule.forFeature([PublicEffects]),
    CartModule,
    CommonModule,
    MatBadgeModule,
    MatStepperModule,
    CdkStepperModule
  ],
  declarations: [
    AppComponent,
    MainComponent,
    ClientRegisterComponent,
    OrderComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    }
  ]
})
export class AppModule {}
