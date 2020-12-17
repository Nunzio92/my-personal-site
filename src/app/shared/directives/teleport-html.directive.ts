import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[ifteleport]'
})
export class TeleportHtmlDirective implements AfterViewInit {
    canTeleport: boolean | undefined;
    parentBeforeTeleport: HTMLElement | undefined;
    siblingFinalDest: HTMLElement | undefined;
    siblingInitialDest: HTMLElement | undefined;

    @Input() finalDestinationRef: HTMLElement | undefined;

    @Input() set ifteleport(condition: boolean) { // tramite setter aggiornando l'input si riesegue il codice sotto...
        this.canTeleport = condition;
        if (condition && !!this.finalDestinationRef?.parentNode) {
            this.renderer2.insertBefore(this.finalDestinationRef.parentNode, this.el.nativeElement, this.siblingFinalDest);
        } else if (!!this.parentBeforeTeleport) {
            this.renderer2.insertBefore(this.parentBeforeTeleport, this.el.nativeElement, this.siblingInitialDest);
        }
    }


    constructor(private el: ElementRef,
                private renderer2: Renderer2) {
    }

    ngAfterViewInit(): void { // sono sicuro che la view esiste pe intero... Inizializzo le variabili necessarie
        this.parentBeforeTeleport = this.el.nativeElement.parentNode;
        this.siblingFinalDest = this.renderer2.nextSibling(this.finalDestinationRef);
        this.siblingInitialDest = this.renderer2.nextSibling(this.el.nativeElement);
        if (this.canTeleport && !!this.finalDestinationRef) {
            this.renderer2.insertBefore(this.finalDestinationRef.parentNode, this.el.nativeElement, this.siblingFinalDest);
        }
    }
}

/* La direttiva telport permette spostamenti agevoli di html senza dover introdurre ng-template. Tramite renderer2 si identifica i nativeElement successivi
    all'elemento di partenza e all'elemento di destinazione, se non sono presenti allora l'insertBefore si comporterà come un appendChield, quindi è necessario avere a
    disposizione il parent node di inizio e fine (finalDestinationRef.parentnode e parentBeforeTeleport).
 */
