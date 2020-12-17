import { ActionReducerMap } from '@ngrx/store';
import * as appReducer from './app.reducer';
import * as publicAreaReducer from './public-area.reducer';


export interface EntityState {
    app: appReducer.AppState;
    publicArea: publicAreaReducer.PublicAreaState;
}

export const reducers: ActionReducerMap<EntityState> = {
    app: appReducer.reducer,
    publicArea: publicAreaReducer.reducer
};
