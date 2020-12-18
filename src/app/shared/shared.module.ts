import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { RouterModule } from '@angular/router';
import { TeleportHtmlDirective } from './directives/teleport-html.directive';
import { DarkModalComponent } from './dark-modal/dark-modal.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    TeleportHtmlDirective,
    DarkModalComponent,
    SideMenuComponent
  ],
  imports: [
    CommonModule,
    NgxUsefulSwiperModule,
    RouterModule,
    NgSelectModule
  ],
  exports: [
    NgxUsefulSwiperModule,
    RouterModule,
    DarkModalComponent,
    SideMenuComponent,
    NgSelectModule
  ]

})
export class SharedModule {
}
