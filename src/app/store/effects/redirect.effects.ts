import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

// Questo effects si occuperà unicamente degli effetti di redirect che allo stato attuale non dispacciano nessuna action

@Injectable()
export class RedirectEffects {


    constructor(private actions$: Actions,
    ) {

    }

}
