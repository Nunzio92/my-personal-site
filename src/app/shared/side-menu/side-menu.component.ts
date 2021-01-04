import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import { AppSelectors } from '../../store/services/app.selector';
import { Subject } from 'rxjs';
import TweenLite from 'gsap/gsap-core';
import { Store } from '@ngrx/store';
import { setDragNavPosition } from '../../store';
import { delay, takeUntil } from 'rxjs/operators';
import { StorageManagerService } from '../../core/storage-manager/storage-manager.service';
import { ApplicationParams } from '../application-params';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('sideNav') sideNav: ElementRef | undefined;
  @ViewChild('dropArea') dropArea: ElementRef | undefined;
  canDragNav: undefined | boolean = false;
  private unsubscribe: Subject<void> = new Subject<void>();
  private dropZones: any;
  navIdex: number | undefined;


  constructor(private render: Renderer2,
              private elementRef: ElementRef,
              private store: Store,
              private storageManager: StorageManagerService,
              private appSelector: AppSelectors) {
  }

  ngOnInit(): void {
    gsap.registerPlugin(Draggable);
    this.dropZones = this.elementRef.nativeElement.querySelectorAll('.drop-zone');

  }

  ngAfterViewInit(): void {
    this.appSelector.navbarStatus$.pipe(takeUntil(this.unsubscribe)).subscribe(v => {
      this.canDragNav = v?.canDragNav;
      this.navIdex = v?.navbarIndex;
      if (v?.canDragNav) {
        Draggable.get('.neon-shadow') ? this.animateAndContinue() : this.startGrabState();
      } else {
        Draggable.get('.neon-shadow')?.disable();
      }
    });
    const selectedIndex = this.storageManager.getLocalItem(ApplicationParams.NAVBAR_POSITION);
    if (!!selectedIndex) {
      const dropBound = this.dropZones[selectedIndex].getBoundingClientRect();
      const dropItem = this.dropZones[selectedIndex];
      const dragBound = this.sideNav?.nativeElement.getBoundingClientRect();
      this.store.dispatch(setDragNavPosition({selectedIndex}));
      TweenLite.to(this.sideNav?.nativeElement, 0, {
        x: '+=' + (dropBound.x - dragBound.x),
        y: '+=' + (dropBound.y - dragBound.y),
        width: dropItem.clientWidth,
        height: dropItem.clientHeight
      });
      if (selectedIndex === 1){
        TweenLite.to('#settings', 0, {top: dragBound.y < 75 ? '+=' + 75 : 25});
      }

    }
  }

  animateAndContinue(): void {
    this.middleScreenAnimation();
    Draggable.get('.neon-shadow')?.enable();

  }

  middleScreenAnimation(): void {
    const xPosition = (window.innerWidth / 2) - 75;
    const yPosition = (window.outerHeight / 2) - 35;
    TweenLite.to('.neon-shadow', 0.5, {
      width: '150px', height: '70px',
      x: xPosition, y: yPosition
    });
  }

  startGrabState(): void {
    const overlapThreshold = '10%';
    let foundIndex: number | null = null; // current droparea index user is hovering
    const self = this;
    this.middleScreenAnimation();

    Draggable.create('.neon-shadow', {
      type: 'x,y',
      throwProps: false,
      bounds: '.drop-zone-target',
      onDrag(e): any {
        let i = self.dropZones.length;
        while (--i > -1) {
          if (this.hitTest(self.dropZones[i], overlapThreshold)) {
            foundIndex = i;
            TweenLite.to(self.dropZones[i], 0.5, {
              opacity: 0.7,
              background: '#605d5d',
            });
            TweenLite.to(self.dropZones[i], 0, {zIndex: 1});
            return;
          } else {
            foundIndex = null;
            TweenLite.to(self.dropZones[i], 0.5, {
              opacity: 1,
              background: '#242424',
            });
            TweenLite.to(self.dropZones[i], 0, {zIndex: 0});
          }
        }
      },
      onDragEnd(): any {
        console.log(foundIndex);
        if (foundIndex === null) {
          // move to center pos
          TweenLite.to(this.target, 0.2, {
            x: (document.body.getBoundingClientRect().width / 2) - 75,
            y: (document.body.getBoundingClientRect().height / 2) - 35,
          });
          return;
        }
        // element hittest passed so i want to postion it in the droparea and scale dragarea to cover droparea
        const dropBound = self.dropZones[foundIndex].getBoundingClientRect();
        const dropItem = self.dropZones[foundIndex];
        const dragBound = this.target.getBoundingClientRect();
        TweenLite.to(this.target, 0.2, {
          x: '+=' + (dropBound.x - dragBound.x),
          y: '+=' + (dropBound.y - dragBound.y),
          width: dropItem.clientWidth,
          height: dropItem.clientHeight
        });
        TweenLite.to('#settings', 0.2, {top: dragBound.y < 75 ? '+=' + 75 : 25});
        self.store.dispatch(setDragNavPosition({selectedIndex: foundIndex}));
      }
    });
  }


  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}


