import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'ngx-useful-swiper';
import { Observable, Subject, timer } from 'rxjs';
import { AppSelectors } from '../../store/services/app.selector';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { closeGameMenu, openGameMenu } from '../../store';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss'],
})
export class MobileNavbarComponent implements OnInit, OnDestroy, AfterViewInit {
  /**
   * Lo swiper può essere un component pensante durante il rendering della pagina perchè attiva un listener su ogni spostamento del mouse.
   * Per questo viene inizializzato dopo 1.5 secondi per non appesantire eventuali view già pesanti da renderizzare
   */
  private unsubscribe: Subject<void> = new Subject<void>();


  config: SwiperOptions = {
    slidesPerView: 'auto',
    initialSlide: 0,
    // resistanceRatio: 0,
    shortSwipes: true,
    longSwipes: true,
    updateOnWindowResize: true,
    init: true,

    // used to prevent sliding go back on release during long swipe
    freeMode: true,
    freeModeSticky: true,
    grabCursor: true,

    on: {
      reachEnd: () => {
        // console.log('reachEnd');
        this.store.dispatch(openGameMenu());
        // this.menuIsOpened = true;
      },
      reachBeginning: () => {
        // console.log('reachBeginning');
        this.store.dispatch(closeGameMenu());

        // this.menuIsOpened = false;

      }
    }
  };
  menuIsOpened = false;

  // @ts-ignore
  @ViewChild('swiperMenu', {static: false}) swiperMenu: SwiperComponent;
  navbarIndex$: Observable<number>;

  constructor(private store: Store,
              private appSelectors: AppSelectors) {
    this.navbarIndex$ = this.appSelectors.navbarIndex$;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    timer(1000).subscribe(_ => {
      this.swiperMenu.config.init = true;
      // this.swiperMenu.swiper.init();
      // this.swiperMenu.swiper.update();
    });
    this.appSelectors.gameMenuIsOpen$.pipe(takeUntil(this.unsubscribe))
      .subscribe(v => {
        this.menuIsOpened = v;
        v ? this.openMenu() : this.closeMenu();
      });
  }

  closeMenu(): void {
    this.swiperMenu.swiper.slidePrev();
  }

  openMenu(): void {
    this.swiperMenu.swiper.update();
    this.swiperMenu.swiper.slideNext();
  }


  changeMenu(): void {
    if (this.menuIsOpened) {
      this.swiperMenu.swiper.slidePrev();
    } else {
      this.swiperMenu.swiper.slideNext();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
