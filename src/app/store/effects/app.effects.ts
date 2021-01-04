import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { changeNeonColor, changeNeonStatus, initAppStore, scrollDown, scrollUp, setDragNavPosition, successInitAppStore } from '../actions';
import { auditTime, concatMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { from, fromEvent, of } from 'rxjs';
import { DeviceInfo } from '../../model/device-info';
import { Capacitor, Device } from '@capacitor/core';
import { AppSelectors } from '../services/app.selector';
import { StorageManagerService } from '../../core/storage-manager/storage-manager.service';
import { ApplicationParams } from '../../shared/application-params';
import { Store } from '@ngrx/store';


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
        const neonColor = this.storageManager.getLocalItem(ApplicationParams.NEON_COLOR);
        if (!!neonColor){
          this.store.dispatch(changeNeonColor({colorValue: neonColor}));
        }
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
      ofType(changeNeonColor, changeNeonStatus),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.appSelector.neonColor$)
      )),
      map(([action, neonColor]) => {
         if (action.type === changeNeonColor.type){
           document.documentElement.style.setProperty('--neon-color', action.colorValue);
           this.storageManager.setLocalItem(ApplicationParams.NEON_COLOR, action.colorValue);
         } else {
           document.documentElement.style.setProperty('--neon-color', action.value ? neonColor : 'no-neon');
           this.storageManager.setLocalItem(ApplicationParams.NEON_COLOR, action.value ? neonColor : 'no-neon');
         }
        }
      )), {dispatch: false});

  changeNavBarPosition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setDragNavPosition),
      map(action => {
            this.storageManager.setLocalItem(ApplicationParams.NAVBAR_POSITION, action.selectedIndex);
        }
      )), {dispatch: false});


  // TODO per debuggare in mobile, è un listener di tutte le action
  // actionlistener$ = createEffect(() =>
  //     this.actions$.pipe(
  //         tap(a => console.log(a))
  //     ), {dispatch: false});

  constructor(private actions$: Actions,
              private store: Store,
              private storageManager: StorageManagerService,
              private appSelector: AppSelectors
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


