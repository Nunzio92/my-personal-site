import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { initAppStore, startFog, stopFog } from './store';
import { Observable } from 'rxjs';
import { AppSelectors } from './store/services/app.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-personal-site';
  modalIsOpen$: Observable<boolean>;
  fogStatus$: Observable<boolean>;


  constructor(private store: Store,
              private appStateSelector: AppSelectors) {
    this.modalIsOpen$ = this.appStateSelector.modalIsOpen$;
    this.fogStatus$ = this.appStateSelector.fogStatus$;
    this.store.dispatch(initAppStore());
  }

}
