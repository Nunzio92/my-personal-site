import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { initAppStore } from './store';
import { Observable, timer } from 'rxjs';
import { AppSelectors } from './store/services/app.selector';
import gsap from 'gsap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'my-personal-site';
  modalIsOpen$: Observable<boolean>;
  fogStatus$: Observable<boolean>;
  dragActive$: Observable<boolean>;

  constructor(private store: Store,
              private renderer: Renderer2,
              private appStateSelector: AppSelectors) {
    this.modalIsOpen$ = this.appStateSelector.modalIsOpen$;
    this.fogStatus$ = this.appStateSelector.fogStatus$;
    this.dragActive$ = this.appStateSelector.canDragNav$;
    this.store.dispatch(initAppStore());
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    timer(1000).subscribe(_ => {
      const tl = gsap.timeline({repeat: 0, yoyo: true});
      tl.to('body', {overflow: 'hidden', duration: 0});
      tl.to('#svg1', {animation: 'draw 1s linear forwards', duration: 0});
      tl.to('#svg1', {
        delay: 0.5,
        duration: 0.6,
        filter: 'drop-shadow(0 0 5px #000) drop-shadow(0 0 8px #fff) drop-shadow(0 0 12px #fff) drop-shadow(0 0 15px var(--neon-color)) drop-shadow(0 0 25px var(--neon-color)) drop-shadow( 0px 0px 250px #00ff66) drop-shadow( 0px 0px 550px var(--neon-color))'
      });
      // tl.to('#svg1', 0.5, {filter: 'drop-shadow(0px 0px 250px #00ff66) drop-shadow(0px 0px 550px blue)', opacity: 0});
      tl.to('#lightsaber', {duration: 0.3, opacity: 0, display: 'none'});
      tl.to('body', {duration: 0, overflow: 'visible'});
    });
  }

}
