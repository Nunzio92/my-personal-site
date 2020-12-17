import { Action, createReducer, on } from '@ngrx/store';
import { closeModal, openModal, startFog, startLoading, stopFog, stopLoading, successInitAppStore } from '../actions';
import { DeviceInfo } from '../../model/device-info';

export interface ScrollState {
  isScrollingUp: boolean;
  yOffset: number;
}

export interface AppState {
  // app is loading something
  loading: boolean;
  scrollState: ScrollState;
  deviceInfo: DeviceInfo | null;
  modalIsOpen: boolean;
  fog: boolean;

}

export const initialState: AppState = {
  loading: false,
  scrollState: {
    isScrollingUp: false,
    yOffset: 0
  },
  deviceInfo: null,
  modalIsOpen: false,
  fog: false
};

const appReducer = createReducer(initialState,
  on(startLoading, (state) => ({...state, loading: true})),
  on(stopLoading, (state) => ({...state, loading: false})),
  on(successInitAppStore, (state, {deviceInfo}) => ({...state, deviceInfo})),
  on(openModal, (state) => ({...state, modalIsOpen: true, fog: true})),
  on(closeModal, (state) => ({...state, modalIsOpen: false, fog: false})),
  on(startFog, (state) => ({...state, fog: true})),
  on(stopFog, (state) => ({...state, fog: false})),
);


export function reducer(state: AppState | undefined, action: Action): AppState {
  return appReducer(state, action);
}

