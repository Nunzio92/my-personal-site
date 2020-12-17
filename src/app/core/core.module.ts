import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './guards/module-import-guard';
import { StorageManagerService } from './storage-manager/storage-manager.service';
import { PreloadSelectedModulesList } from './guards/preload-strategy';

import { ExceptionModule } from './exception/exception.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ExceptionModule,
        BrowserAnimationsModule,
    ],
    exports: [
    ],
    providers: [
        StorageManagerService,
        PreloadSelectedModulesList
    ]
})
export class CoreModule {

    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }

}
