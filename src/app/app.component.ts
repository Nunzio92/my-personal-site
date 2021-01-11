import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { initAppStore } from './store';
import { Observable, timer } from 'rxjs';
import { AppSelectors } from './store/services/app.selector';
import gsap from 'gsap';
import Vivus from 'vivus';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
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
  }

  ngAfterViewInit(): void {
    gsap.to('#svg1', 0, { visibility: 'hidden'});

    timer(500).subscribe( _ => {
      gsap.to('#svg1', 0, { visibility: 'visible'});
      const tl = gsap.timeline({repeat: 0, yoyo: true});
      tl.to('body', 0, {overflow: 'hidden'});
      const vivus = new Vivus('svg1', // https://github.com/maxwellito/vivus
        {duration: 50, animTimingFunction: Vivus.EASE, onReady: vivusInstance => vivusInstance.play()}
      );
      // tl.fromTo('#poli', {drawSVG: '0%'} , {drawSVG: '100%', duration: 0.7, ease: 'power2.inOut'});
      tl.to('#svg1', 0.6, {delay: 0.5, filter: 'drop-shadow(0 0 5px #000) drop-shadow(0 0 8px #fff) drop-shadow(0 0 12px #fff) drop-shadow(0 0 15px var(--neon-color)) drop-shadow(0 0 25px var(--neon-color)) drop-shadow( 0px 0px 250px #00ff66) drop-shadow( 0px 0px 550px var(--neon-color))'});
      // tl.to('#svg1', 0.5, {filter: 'drop-shadow(0px 0px 250px #00ff66) drop-shadow(0px 0px 550px blue)', opacity: 0});
      tl.to('#lightsaber', 0.3, {opacity: 0, display: 'none'});
      tl.to('body', 0, {overflow: 'visible'});
    });
  }

}
