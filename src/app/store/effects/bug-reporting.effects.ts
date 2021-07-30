import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { filter, map, mergeMap, take, takeUntil, tap, toArray } from 'rxjs/operators';

import { Observable, OperatorFunction, pipe, ReplaySubject, timer } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { INITIAL_OPTIONS, StoreDevtoolsConfig } from '@ngrx/store-devtools';

export interface BugReportInterface {
  actionsStack: Action [];
  lastState: {};
}

/**
 * register this effect into EffectsModule.forRoot([BugReportingEffects]) insiede app.module
 */
@Injectable()
export class BugReportingEffects {
  private replySub$ = new ReplaySubject<Action>(8);

  private replaySubjectEffect$ = createEffect(() =>
    this.actions$.pipe(
      tap(action => {
        this.replySub$.next(action);
      }),
    ), {dispatch: false});


  getActionStack(): Observable<BugReportInterface> {
    return this.replySub$.pipe(toArrayAndComplete(this.config, this.store));
  }


  constructor(private actions$: Actions,
              private store: Store,
              @Inject(INITIAL_OPTIONS) private config: StoreDevtoolsConfig) {}
}


function toArrayAndComplete(storeDevtoolsConfigWithInjectionToken: StoreDevtoolsConfig, store: Store):
  OperatorFunction<Action, BugReportInterface> {
  return pipe(
    filter(action => storeDevtoolsConfigWithInjectionToken.actionsBlocklist?.findIndex(v => action.type === v) === -1),
    takeUntil(timer(0)), // chiudo subito lo stream o volendo anche dopo pochi ms
    toArray(), // quando lo stream si chiude ritorna tutti i valori emessi in un array
    mergeMap(v => store.pipe(map(state => ({actionsStack: v, lastState: state})))), // concateno l'array con lo stato
    take(1), // emetto un solo valore e chiudo lo stream... non ci sarà bisogno di fare l'unsubscribe ( meglio farla per best practice)
  );
}


