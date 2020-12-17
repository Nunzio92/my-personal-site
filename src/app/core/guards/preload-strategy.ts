import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Utility } from '../../shared/utility/utility';

interface PreloadConfig {
    dueTime?: number;
}

export class PreloadSelectedModulesList implements PreloadingStrategy {
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        if (!!route.data && Utility.isObject(route.data.preload)) {
            const preloadData = route.data.preload as PreloadConfig;
            // console.log('preload path:' + route.path + ' with data' + JSON.stringify(preloadData));
            return timer(preloadData.dueTime || 500).pipe(mergeMap(() => load()));
            // console.log('preload path:' + route.path);
            // return timer(500).pipe(mergeMap(() => load()));
        } else {
            return of(null);
        }
    }
}
