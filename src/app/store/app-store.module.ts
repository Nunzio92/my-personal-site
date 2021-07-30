import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { AppEffects } from './effects/app.effects';
import { RedirectEffects } from './effects/redirect.effects';
import { AppSelectors } from './services/app.selector';
import { StoreDevtoolsConfig } from '@ngrx/store-devtools';
import { BugReportingEffects } from './effects/bug-reporting.effects';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature('entityCache', reducers),
        EffectsModule.forFeature([ AppEffects, RedirectEffects])
    ],
    providers: [
        AppSelectors
    ],
    exports: [StoreModule, EffectsModule]
})
export class AppStoreModule {
}
