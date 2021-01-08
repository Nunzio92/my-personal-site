import { Action, createReducer, on } from '@ngrx/store';
import {
  activeDragNav,
  changeNeonColor,
  changeNeonStatus,
  closeModal, setDragNavPosition, hideSetting,
  openModal, showSetting,
  startFog,
  startLoading,
  stopFog,
  stopLoading,
  successInitAppStore, openGameMenu, closeGameMenu
} from '../actions';
import { DeviceInfo } from '../../model/device-info';
import { ScrollState, SiteSettings } from '../../model/app-interfaces';


export interface AppState {
  // app is loading something
  loading: boolean;
  scrollState: ScrollState;
  deviceInfo: DeviceInfo | null;
  gameMenuisOpen: boolean;
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
  gameMenuisOpen: false,
  modalIsOpen: false,
  settings: {showSettings: false, fog: false, navBarStatus: {canDragNav: false, navbarIndex: 0}, neonStatus: {visible: true, activeColor: 'purple'}}
};
const appReducer = createReducer(initialState,
  on(startLoading, (state) => ({...state, loading: true})),
  on(stopLoading, (state) => ({...state, loading: false})),
  on(successInitAppStore, (state, {deviceInfo}) => ({...state, deviceInfo})),
  on(openModal, (state) => ({...state, modalIsOpen: true, settings: {...state.settings, fog: true}})),
  on(closeModal, (state) => ({...state, modalIsOpen: false,  settings: {...state.settings, fog: false}})),
  on(startFog, (state) => ({...state,  settings: {...state.settings, fog: true}})),
  on(stopFog, (state) => ({...state,  settings: {...state.settings, fog: false}})),
  on(changeNeonStatus, (state, {value}) => ({...state,  settings: {...state.settings, neonStatus: {...state.settings.neonStatus, visible: value}}})),
  on(changeNeonColor, (state, {colorValue}) => ({...state,  settings: {...state.settings, neonStatus: {...state.settings.neonStatus, activeColor: colorValue}}})),
  on(showSetting, (state) => ({...state,  settings: {...state.settings, showSettings: true}})),
  on(hideSetting, (state) => ({...state,  settings: {...state.settings, showSettings: false}})),
  on(activeDragNav, (state) => ({...state,  settings: {...state.settings, navBarStatus: {...state.settings.navBarStatus, canDragNav: true}}})),
  on(setDragNavPosition, (state, {selectedIndex}) => ({...state,  settings: {...state.settings, navBarStatus: {...state.settings.navBarStatus, canDragNav: false, navbarIndex: selectedIndex}}})),
  on(openGameMenu, (state) => ({...state,  gameMenuisOpen: true, settings: {...state.settings, showSettings: false}})),
  on(closeGameMenu, (state) => ({...state,  gameMenuisOpen: false})),

);


export function reducer(state: AppState | undefined, action: Action): AppState {
  return appReducer(state, action);
}

