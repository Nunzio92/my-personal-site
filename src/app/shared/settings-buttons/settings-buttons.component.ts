import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppSelectors } from '../../store/services/app.selector';
import { activeDragNav, changeNeonColor, changeNeonStatus, hideSetting, showSetting, startFog, stopFog } from '../../store';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { KeyValue } from '@angular/common';
import { initialState } from '../../store/reducers/app.reducer';
import { NavbarState } from '../../model/app-interfaces';

@Component({
  selector: 'app-settings-buttons',
  templateUrl: './settings-buttons.component.html',
  styleUrls: ['./settings-buttons.component.scss']
})
export class SettingsButtonsComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject<void>();
  selectNeonColor = initialState.settings.neonStatus.activeColor;

  showFog = false;
  elencoColori: KeyValue<string, string>[] = [{ key: 'red', value: 'red' } , { key: 'purple', value: 'purple' } , { key: 'green', value: 'green' }];
  neonStatus: boolean | undefined;
  showSettings$: Observable<boolean> = this.appStateSelector.showSettings$;
  canDragNav$: Observable<boolean> =  this.appStateSelector.canDragNav$;
  navbarStatus$: Observable<NavbarState> =  this.appStateSelector.navbarStatus$;

  constructor(private store: Store,
              private appStateSelector: AppSelectors) { }

  ngOnInit(): void {
    this.appStateSelector.fogStatus$.pipe(takeUntil(this.unsubscribe))
      .subscribe(v => this.showFog = v);
    this.appStateSelector.neonStatus$.pipe(takeUntil(this.unsubscribe))
      .subscribe(v => {
        this.neonStatus = v.visible;
        this.selectNeonColor = v.activeColor;
      });
  }

  changeSettingStatus(status: boolean | undefined): void{
     this.store.dispatch(!!status ? hideSetting() : showSetting());
  }

  changeFogStatus(): void {
    this.showFog ? this.store.dispatch(stopFog()) : this.store.dispatch(startFog());
  }

  changeNeonColor(): void{
    this.store.dispatch(changeNeonColor({colorValue: this.selectNeonColor}));
  }

  changeNeonStatus(): void{
    this.store.dispatch(changeNeonStatus({value: !this.neonStatus}));
  }

  activateDropNav(): void{
    this.store.dispatch( activeDragNav());
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
