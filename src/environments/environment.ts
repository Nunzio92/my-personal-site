// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const environment = {
  production: false
};

export const devDep = [
  StoreDevtoolsModule.instrument({
    name: 'My-personal-site',
    maxAge: 35, // Retains last 35 states
    logOnly: environment.production, // Restrict extension to log-only mode
    actionsBlocklist: ['[NATIVE_ACTION] SCROLL_UP', '[NATIVE_ACTION] SCROLL_DOWN', '[Spinner] START_LOADING', '[Spinner] STOP_LOADING']
  }),
  // environment.mockEnable ? MockModule.forRoot() : MockModule
];

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
