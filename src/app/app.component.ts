import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { initAppStore, startFog, stopFog } from './store';
import { Observable } from 'rxjs';
import { AppSelectors } from './store/services/app.selector';
import { NavbarState } from './model/app-interfaces';
import gsap from 'gsap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'my-personal-site';
  modalIsOpen$: Observable<boolean>;
  fogStatus$: Observable<boolean>;
  dragActive$: Observable<boolean>;


  constructor(private store: Store,
              private appStateSelector: AppSelectors) {
    this.modalIsOpen$ = this.appStateSelector.modalIsOpen$;
    this.fogStatus$ = this.appStateSelector.fogStatus$;
    this.dragActive$ = this.appStateSelector.canDragNav$;
    this.store.dispatch(initAppStore());
  }

  ngOnInit(): void {
    var tl = gsap.timeline({repeat: 0});

    tl.to('body', 0, {overflow: 'hidden'});
    tl.to('#light', 0.5, {boxShadow: '0 0 5px #fff,0 0 8px #fff,0 0 12px #fff,0 0 15px blue,0 0 25px blue,#00ff66 0px 0px 250px 20px, blue 0px 0px 550px 20px'});
    tl.to('#light', 0.5, { background: '#05401a', boxShadow: '#00ff66 0px 0px 250px 20px, blue 0px 0px 550px 20px',
      // opacity: 0
    });
    tl.to('#lightsaber', 0.5, { opacity: 0, display: 'none'});
    tl.to('body', 0, {overflow: 'visible'});
  }

}
