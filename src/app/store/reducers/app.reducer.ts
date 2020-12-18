import { Action, createReducer, on } from '@ngrx/store';
import { closeModal, openModal, startFog, startLoading, stopFog, stopLoading, successInitAppStore } from '../actions';
import { DeviceInfo } from '../../model/device-info';
import { ScrollState, SiteSettings } from '../../model/app-interfaces';


export interface AppState {
  // app is loading something
  loading: boolean;
  scrollState: ScrollState;
  deviceInfo: DeviceInfo | null;
  modalIsOpen: boolean;
  settings: SiteSettings;
}

export const initialState: AppState = {
  loading: false,
  scrollState: {
    isScrollingUp: false,
    yOffset: 0
  },
  deviceInfo: null,
  modalIsOpen: false,
  settings: {showSettings: false, fog: false, neonStatus: {visible: true, activeColor: 'purple'}}
};

const appReducer = createReducer(initialState,
  on(startLoading, (state) => ({...state, loading: true})),
  on(stopLoading, (state) => ({...state, loading: false})),
  on(successInitAppStore, (state, {deviceInfo}) => ({...state, deviceInfo})),
  on(openModal, (state) => ({...state, modalIsOpen: true, settings: {...state.settings, fog: true}})),
  on(closeModal, (state) => ({...state, modalIsOpen: false,  settings: {...state.settings, fog: false}})),
  on(startFog, (state) => ({...state,  settings: {...state.settings, fog: true}})),
  on(stopFog, (state) => ({...state,  settings: {...state.settings, fog: false}})),
);


export function reducer(state: AppState | undefined, action: Action): AppState {
  return appReducer(state, action);
}

