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
    (state: EntityState) => state.app.settings?.fog
);
const getNeonStatus = createSelector(
    getEntityState,
    (state: EntityState) => state.app.settings?.neonStatus
);
const getNavStatus = createSelector(
    getEntityState,
    (state: EntityState) => state.app.settings?.navBarStatus
);
const getNavIndex = createSelector(
  getEntityState,
  (state: EntityState) => state.app.settings?.navBarStatus?.navbarIndex
);
const getGrabNavStatus = createSelector(
    getEntityState,
    (state: EntityState) => state.app.settings?.navBarStatus?.canDragNav
);
const getNeonColor = createSelector(
    getEntityState,
    (state: EntityState) => state.app.settings?.neonStatus?.activeColor
);
const getSettingStatus = createSelector(
    getEntityState,
    (state: EntityState) => state.app.settings?.showSettings
);
const getGameMenuStatus = createSelector(
    getEntityState,
    (state: EntityState) => state.app.gameMenuisOpen
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
    neonStatus$ = this.store.pipe(select(getNeonStatus), map(e => ObjectUtility.deepClone(e)));
    navbarStatus$ = this.store.pipe(select(getNavStatus), map(e => ObjectUtility.deepClone(e)));
    navbarIndex$ = this.store.pipe(select(getNavIndex), map(e => ObjectUtility.deepClone(e)));
    canDragNav$ = this.store.pipe(select(getGrabNavStatus), map(e => ObjectUtility.deepClone(e)));
    neonColor$ = this.store.pipe(select(getNeonColor), map(e => ObjectUtility.deepClone(e)));
    showSettings$ = this.store.pipe(select(getSettingStatus), map(e => ObjectUtility.deepClone(e)));
    gameMenuIsOpen$ = this.store.pipe(select(getGameMenuStatus), map(e => ObjectUtility.deepClone(e)));

}
