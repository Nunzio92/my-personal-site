import { createFeatureSelector, createSelector, select, Store } from '@ngrx/store';
import { EntityState } from '../reducers';
import { Injectable } from '@angular/core';
import { ObjectUtility } from '../../shared/utility/object-utility';
import { map } from 'rxjs/operators';


// selectors
const getEntityState = createFeatureSelector<EntityState>('entityCache');

const getAppState = createSelector(
    getEntityState,
    (state: EntityState) => state.app
);

const getModalState = createSelector(
    getEntityState,
    (state: EntityState) => state.app.modalIsOpen
);
const getFogStatus = createSelector(
    getEntityState,
    (state: EntityState) => state.app.fog
);
export const getScrollingState = createSelector(
  getEntityState,
  (state: EntityState) => state.app.scrollState
);

@Injectable()
export class AppSelectors {
    constructor(private store: Store<EntityState>) {
    }
  scrollState$ = this.store.pipe(select(getScrollingState), map(e => ObjectUtility.deepClone(e)));
    modalIsOpen$ = this.store.pipe(select(getModalState), map(e => ObjectUtility.deepClone(e)));
    fogStatus$ = this.store.pipe(select(getFogStatus), map(e => ObjectUtility.deepClone(e)));

}
