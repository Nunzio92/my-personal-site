import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { EntityState } from '../../store';
import { closeModal } from '../../store';
import { StorageManagerService } from '../../core/storage-manager/storage-manager.service';

@Component({
    selector: 'app-dark-modal',
    templateUrl: './dark-modal.component.html',
    styleUrls: ['./dark-modal.component.scss']
})
export class DarkModalComponent implements OnInit {

    showtext = false;
    @ViewChild('video') video: ElementRef | undefined;


    constructor(private store: Store<EntityState>,
                private storageManager: StorageManagerService) {
    }

    ngOnInit(): void {
        timer(50).pipe(take(1))
            .subscribe(_ =>
                this.playvideo()
            );
    }

    playVid(): void {
        if (!!this.video) {
          this.video.nativeElement.play();
      }
    }

    playvideo(): void {
        setTimeout(() =>
                this.playVid()
            , 800);
        this.playVid();
        timer(1700).pipe(take(1))
            .subscribe(_ =>
                this.showtext = true
            );
    }

    closeModal(): void {
        this.store.dispatch(closeModal());
        // this.storageManager.setLocalItem(ApplicationParams.LocalStorageConstant.userConfermedModal_Key,
        //     ApplicationParams.LocalStorageConstant.userConfermedModal_Value);
    }

}
