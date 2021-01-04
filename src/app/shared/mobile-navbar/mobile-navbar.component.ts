import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'ngx-useful-swiper';
import { timer } from 'rxjs';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss'],
})
export class MobileNavbarComponent implements OnInit, AfterViewInit {
  /**
   * Lo swiper può essere un component pensante durante il rendering della pagina perchè attiva un listener su ogni spostamento del mouse.
   * Per questo viene inizializzato dopo 1.5 secondi per non appesantire eventuali view già pesanti da renderizzare
   */

  config: SwiperOptions = {
    slidesPerView: 'auto',
    initialSlide: 0,
    resistanceRatio: 0,
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
        this.menuIsOpened = true;
      },
      reachBeginning: () => {
        // console.log('reachBeginning');
        this.menuIsOpened = false;

      }
    }
  };
  menuIsOpened = false;

  // @ts-ignore
  @ViewChild('swiperMenu', {static: false}) swiperMenu: SwiperComponent;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    timer(1000).subscribe(_ => {
      this.swiperMenu.config.init = true;
      // this.swiperMenu.swiper.init();
      // this.swiperMenu.swiper.update();
    });
  }

  closeMenu(): void {
    this.swiperMenu.swiper.slidePrev();
  }


  changeMenu(): void {
    if (this.menuIsOpened) {
      this.swiperMenu.swiper.slidePrev();
    } else {
      this.swiperMenu.swiper.slideNext();
    }
  }

}
