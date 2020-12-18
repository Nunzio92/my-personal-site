import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppSelectors } from '../../store/services/app.selector';
import { changeNeonColor, startFog, stopFog } from '../../store';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { KeyValue } from '@angular/common';
import { initialState } from '../../store/reducers/app.reducer';

@Component({
  selector: 'app-settings-buttons',
  templateUrl: './seggings-buttons.component.html',
  styleUrls: ['./seggings-buttons.component.scss']
})
export class SeggingsButtonsComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject<void>();
  selectNeonColor = initialState.settings.neonStatus.activeColor;

  showFog = false;
  elencoColori: KeyValue<string, string>[] = [{ key: 'red', value: 'red' } , { key: 'purple', value: 'purple' } , { key: 'green', value: 'green' }];

  constructor(private store: Store,
              private appStateSelector: AppSelectors) { }

  ngOnInit(): void {
    this.appStateSelector.fogStatus$.pipe(takeUntil(this.unsubscribe))
      .subscribe(v => this.showFog = v);
  }

  changeFogStatus(): void {
    this.showFog ? this.store.dispatch(stopFog()) : this.store.dispatch(startFog());
  }

  changeNeonColor(): void{
    this.store.dispatch(changeNeonColor({colorValue: this.selectNeonColor}));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
