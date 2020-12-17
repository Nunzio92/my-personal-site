import { ActionReducerMap } from '@ngrx/store';
import * as appReducer from './app.reducer';


export interface EntityState {
    app: appReducer.AppState;
}

export const reducers: ActionReducerMap<EntityState> = {
    app: appReducer.reducer,
};
