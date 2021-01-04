import { createAction, props } from '@ngrx/store';
import { APICall, DeviceInfo } from '../../model/device-info';


export const scrollUp = createAction(
  '[NATIVE_ACTION] SCROLL_UP',
  props<{ yOffset: number }>()
);
export const scrollDown = createAction(
  '[NATIVE_ACTION] SCROLL_DOWN',
  props<{ yOffset: number }>()
);


export const startLoading = createAction(
  '[Spinner] START_LOADING'
);

export const stopLoading = createAction(
  '[Spinner] STOP_LOADING'
);

export const initAppStore = createAction(
  '[HOMEPAGE] INIT_APP_STORE',
);
export const successInitAppStore = createAction(
  '[HOMEPAGE] INIT_APP_STORE_SUCCESS',
    props<{ deviceInfo: DeviceInfo }>(),
);

export const saveAPICall = createAction(
  '[API] SAVE_API_CALL',
    props<{ apiCall: APICall }>()
);

// <------------------------ MODAL AND FOG ACTION ---------------------------------->


export const openModal = createAction(
  '[MODAL] OPEN_MODAL',
);
export const closeModal = createAction(
  '[MODAL] CLOSE_MODAL',
);
export const startFog = createAction(
  '[SETTINGS] START_FOG',
);
export const stopFog = createAction(
  '[SETTINGS] STOP_FOG',
);

// <------------------------ HEADER MOBILE ACTION ---------------------------------->
export const indietroMobileAction = createAction(
  '[HEADER_OR_B_BTN_MOBILE] INDIETRO',
);
// <------------------------ CHANGE NEON ACTION ---------------------------------->
export const changeNeonColor = createAction(
  '[SETTINGS] CHANGE_NEON_COLOR',
  props<{ colorValue: string }>()
);
export const changeNeonStatus = createAction(
  '[SETTINGS] CHANGE_NEON_STATUS',
  props<{ value: boolean }>()
);

export const hideSetting = createAction(
  '[SETTINGS] HIDE_SETTING',
);
export const showSetting = createAction(
  '[SETTINGS] SHOW_SETTING',
);

export const activeDragNav = createAction(
  '[SETTINGS] ACTIVE_DRAG_NAV',
);

export const setDragNavPosition = createAction(
  '[SETTINGS] SET_POSITION_AND_DEACTIVE_DRAG_NAV',
  props<{ selectedIndex: number }>()
);


