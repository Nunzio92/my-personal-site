import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { RouterModule } from '@angular/router';
import { TeleportHtmlDirective } from './directives/teleport-html.directive';
import { DarkModalComponent } from './dark-modal/dark-modal.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MobileNavbarComponent } from './mobile-navbar/mobile-navbar.component';


@NgModule({
  declarations: [
    TeleportHtmlDirective,
    DarkModalComponent,
    SideMenuComponent,
    MobileNavbarComponent
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
        NgSelectModule,
        MobileNavbarComponent
    ]

})
export class SharedModule {
}
