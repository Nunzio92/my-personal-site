import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { changeNeonColor, initAppStore, scrollDown, scrollUp, successInitAppStore } from '../actions';
import { auditTime, map, switchMap, tap } from 'rxjs/operators';

import { from, fromEvent } from 'rxjs';
import { DeviceInfo } from '../../model/device-info';
import { Capacitor, Device } from '@capacitor/core';


@Injectable()
export class AppEffects {
  // molto importante l'overload dell' oftype oltre i 5 tipi di action è il seguente: ofType(...[login.type, pippo.type])


  private tempYOffset = 0;

  scrollEvent$ = createEffect(() =>
    fromEvent(document, 'scroll').pipe(
      // debounceTime(500),
      auditTime(200),
      map(_ => {
        return this.tempYOffset > window.pageYOffset ? (scrollUp({yOffset: window.pageYOffset}))
          : (scrollDown({yOffset: window.pageYOffset}));
      }),
      tap(_ => this.tempYOffset = window.pageYOffset)
    ));


  /**
   * Effect used for initialize appStore with device and platform info
   *  {Observable<{deviceInfo: DeviceInfo} & TypedAction<InitAppType.INIT_APP_STORE_SUCCESS>>}
   */
  initAppStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initAppStore),
      switchMap(() => {
          return from(this.promiseDeviceInfo()).pipe(map(
            (res) => {
              return successInitAppStore({
                deviceInfo: res
              });
            }
          ));
        },
      )));


  changeNeonColor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeNeonColor),
      tap(action => document.documentElement.style.setProperty('--neon-color', action.colorValue)
      )), {dispatch: false});


  // TODO per debuggare in mobile, è un listener di tutte le action
  // actionlistener$ = createEffect(() =>
  //     this.actions$.pipe(
  //         tap(a => console.log(a))
  //     ), {dispatch: false});

  constructor(private actions$: Actions,
  ) {
  }

  async promiseDeviceInfo(): Promise<DeviceInfo> {
    const response: DeviceInfo = {
      isNative: Capacitor.isNative,
      platform: Capacitor.getPlatform(),
      fingerPrintAviable: false,
      isFingerPrintRegistered: false,
      userAgent: navigator.userAgent,
      device: Capacitor.getPlatform(),
      sistemaOperativo: null
    };
    await Device.getInfo().then(res => {
      response.sistemaOperativo = `${res.operatingSystem} - ${res.osVersion}`;
    });
    return response;
  }
}


