import { createAction, props } from '@ngrx/store';
import { APICall, DeviceInfo, PositionCoordinate } from '../../model/device-info';


export enum NoAction {
    NOACTION = 'NO ACTION'
}

export enum SpinnerActionTypes {
    START_LOADING = '[Spinner] START_LOADING',
    STOP_LOADING = '[Spinner] STOP_LOADING',
}

export enum ErrorActionTypes {
    ERROR_TROWING = '[ERROR_TROWING] ERROR_TROW',
    WARNING_TROWING = '[ALERT_TROWING] WARNING_TROWING',
    SUCCESS_TROWING = '[ALERT_TROWING] SUCCESS_TROWING',
}

export enum ModalActionType {
    OPEN_MODAL = '[MODAL] OPEN_MODAL',
    CLOSE_MODAL = '[MODAL] CLOSE_MODAL',
    MODAL_NAVIAGTION = '[MODAL] MODAL_NAVIGATION',
}

export enum FogActionType {
    START_FOG = '[FOG] START_FOG',
    STOP_FOG = '[FOG] STOP_FOG',
}

export enum InitAppType {
    INIT_APP_STORE = '[HOMEPAGE] INIT_APP_STORE',
    INIT_APP_STORE_SUCCESS = '[HOMEPAGE] INIT_APP_STORE_SUCCESS',
    INIT_APP_STORE_ERROR = '[HOMEPAGE] INIT_APP_STORE_ERROR',
    UPDATE_CURRENT_POSITION = '[HOMEPAGE] UPDATE_CURRENT_POSITION',
    UPDATE_CURRENT_POSITION_SUCCESS = '[HOMEPAGE] UPDATE_CURRENT_POSITION_SUCCESS',
    UPDATE_CURRENT_POSITION_ERROR = '[HOMEPAGE] UPDATE_CURRENT_POSITION_ERROR',
    INIT_DATI_UTENTE = '[HOMEPAGE] INIT_DATI_UTENTE',
}

export enum ApiCallArchivioType {
    SAVE_API_CALL = '[API] SAVE_API_CALL',
}

export enum HeaderActionType {
    INDIETRO = '[HEADER_OR_B_BTN_MOBILE] INDIETRO',
}


export enum DownloadCMSType {
    DOWNLOAD_VANTAGGI = '[APP_INIT] DOWNLOAD_VANTAGGI',
    DOWNLOAD_VANTAGGI_SUCCESS = '[APP_INIT] DOWNLOAD_VANTAGGI_SUCCESS',
    DOWNLOAD_VANTAGGI_ERROR = '[APP_INIT] DOWNLOAD_VANTAGGI_ERROR',
    DOWNLOAD_PRIVACY = '[APP_INIT] DOWNLOAD_PRIVACY',
    DOWNLOAD_PRIVACY_SUCCESS = '[APP_INIT] DOWNLOAD_PRIVACY_SUCCESS',
    DOWNLOAD_PRIVACY_ERROR = '[APP_INIT] DOWNLOAD_PRIVACY_ERROR',
    DOWNLOAD_UTILIZZO = '[APP_INIT] DOWNLOAD_UTILIZZO',
    DOWNLOAD_UTILIZZO_SUCCESS = '[APP_INIT] DOWNLOAD_UTILIZZO_SUCCESS',
    DOWNLOAD_UTILIZZO_ERROR = '[APP_INIT] DOWNLOAD_UTILIZZO_ERROR',

}

export const noAction = createAction(
    NoAction.NOACTION
);

export const scrollUp = createAction(
  '[NATIVE_ACTION] SCROLL_UP',
  props<{ yOffset: number }>()
);
export const scrollDown = createAction(
  '[NATIVE_ACTION] SCROLL_DOWN',
  props<{ yOffset: number }>()
);


export const startLoading = createAction(
    SpinnerActionTypes.START_LOADING
);

export const stopLoading = createAction(
    SpinnerActionTypes.STOP_LOADING
);

export const initAppStore = createAction(
    InitAppType.INIT_APP_STORE,
);
export const successInitAppStore = createAction(
    InitAppType.INIT_APP_STORE_SUCCESS,
    props<{ deviceInfo: DeviceInfo }>(),
);

export const updateCurrentPosition = createAction(
    InitAppType.UPDATE_CURRENT_POSITION,
);

export const successUpdateCurrentPosition = createAction(
    InitAppType.UPDATE_CURRENT_POSITION_SUCCESS,
    props<{ geolocationPosition: PositionCoordinate }>()
);


export const errorUpdateCurrentPosition = createAction(
    InitAppType.UPDATE_CURRENT_POSITION_ERROR,
);

export const saveAPICall = createAction(
    ApiCallArchivioType.SAVE_API_CALL,
    props<{ apiCall: APICall }>()
);

// <------------------------ MODAL AND FOG ACTION ---------------------------------->


export const openModal = createAction(
    ModalActionType.OPEN_MODAL,
);
export const closeModal = createAction(
    ModalActionType.CLOSE_MODAL,
);
export const startFog = createAction(
    FogActionType.START_FOG,
);
export const stopFog = createAction(
    FogActionType.STOP_FOG,
);

// <------------------------ HEADER MOBILE ACTION ---------------------------------->
export const indietroMobileAction = createAction(
    HeaderActionType.INDIETRO,
);
