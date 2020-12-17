import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { RouterModule } from '@angular/router';
import { TeleportHtmlDirective } from './directives/teleport-html.directive';
import { DarkModalComponent } from './dark-modal/dark-modal.component';


@NgModule({
  declarations: [
    TeleportHtmlDirective,
    DarkModalComponent
  ],
  imports: [
    CommonModule,
    NgxUsefulSwiperModule,
    RouterModule
  ],
  exports: [
    NgxUsefulSwiperModule,
    RouterModule,
    DarkModalComponent
  ]

})
export class SharedModule {
}
