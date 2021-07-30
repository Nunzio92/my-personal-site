import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { devDep, environment } from '../environments/environment';
import { AppStoreModule } from './store/app-store.module';
import { FormsModule } from '@angular/forms';
import { ReactiveComponentModule } from '@ngrx/component';
import { SettingsButtonsComponent } from './shared/settings-buttons/settings-buttons.component';
import { LandingComponent } from './landing/landing.component';
import { StoreDevtoolsConfig } from '@ngrx/store-devtools';

export const metaReducers: MetaReducer<any>[] = environment.production ? [] : [];

@NgModule({
  declarations: [
    AppComponent,
    SettingsButtonsComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot({}, {
        metaReducers,
        runtimeChecks: {
          // strictStateImmutability: true,
          // strictActionImmutability: true,
          // strictStateSerializability: true,
          // strictActionSerializability: true,
        }
      }
    ),
    EffectsModule.forRoot(),
    AppStoreModule,
    ReactiveComponentModule,
    devDep,
    FormsModule
  ],
  providers: [StoreDevtoolsConfig],
  bootstrap: [AppComponent]
})
export class AppModule {
}
