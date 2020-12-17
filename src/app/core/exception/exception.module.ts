import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from '../guards/module-import-guard';
import { GlobalErrorHandler } from './global-error-handler.service';


@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        {provide: ErrorHandler, useClass: GlobalErrorHandler},
    ]
})
export class ExceptionModule {

    constructor(@Optional() @SkipSelf() parentModule: ExceptionModule) {
        throwIfAlreadyLoaded(parentModule, 'ExceptionModule');
    }

}
