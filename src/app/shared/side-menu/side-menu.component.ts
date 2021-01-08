import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import { AppSelectors } from '../../store/services/app.selector';
import { Observable, Subject } from 'rxjs';
import TweenLite from 'gsap/gsap-core';
import { Store } from '@ngrx/store';
import { openGameMenu, setDragNavPosition } from '../../store';
import { takeUntil } from 'rxjs/operators';
import { StorageManagerService } from '../../core/storage-manager/storage-manager.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('sideNav') sideNav: ElementRef | undefined;
  @ViewChild('dropArea') dropArea: ElementRef | undefined;
  isDraggingNav: undefined | boolean = false;
  private unsubscribe: Subject<void> = new Subject<void>();
  private dropZones: any;
  navIdex = 0;
  gameMenuIsOpened: Observable<boolean>;
  navIdex$: Observable<number>;


  constructor(private render: Renderer2,
              private elementRef: ElementRef,
              private store: Store,
              private storageManager: StorageManagerService,
              private appSelector: AppSelectors) {
    this.gameMenuIsOpened = this.appSelector.gameMenuIsOpen$;
    this.navIdex$ = this.appSelector.navbarIndex$;
  }

  ngOnInit(): void {
    gsap.registerPlugin(Draggable);
    this.dropZones = this.elementRef.nativeElement.querySelectorAll('.drop-zone');
  }

  ngAfterViewInit(): void {
    this.appSelector.navbarStatus$.pipe(takeUntil(this.unsubscribe)).subscribe(v => {
      this.isDraggingNav = v?.canDragNav;
      this.navIdex = v?.navbarIndex;
      if (this.navIdex !== undefined) {
        this.reHidratatePosition();
      }
      if (v?.canDragNav) {
        Draggable.get('.neon-shadow') ? this.animateAndContinue() : this.startGrab();
      } else {
        Draggable.get('.neon-shadow')?.disable();
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  reHidratatePosition(): void {
    if (!this.isDraggingNav){
      const dropBound = this.dropZones[this.navIdex].getBoundingClientRect();
      const dragBound = this.sideNav?.nativeElement.getBoundingClientRect();
      TweenLite.to(this.sideNav?.nativeElement, 0, {
        x: '+=' + (dropBound.x - dragBound.x),
        y: '+=' + (dropBound.y - dragBound.y),
        width: this.navIdex === 1 || this.navIdex === 3 ? '100vw' : 70,
        height: this.navIdex === 1 || this.navIdex === 3 ? 70 : '100vh',
      });
    } else {
     this.middleScreenAnimation();
    }
  }

  animateAndContinue(): void {
    this.middleScreenAnimation();
    Draggable.get('.neon-shadow')?.enable();
  }

  middleScreenAnimation(): void {
    const xPosition = (window.innerWidth / 2) - 75;
    const yPosition = (window.outerHeight / 2) - 95;
    TweenLite.to('.neon-shadow', 0.5, {
      width: '150px', height: '70px',
      x: xPosition, y: yPosition
    });
  }

  startGrab(): void {
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
        if (foundIndex === null) {          // move to center position
          TweenLite.to(this.target, 0.2, {
            x: (window.innerWidth / 2) - 75,
            y: (window.outerHeight / 2) - 35,
          });
          return;
        }
        self.store.dispatch(setDragNavPosition({selectedIndex: foundIndex}));
      }
    });
  }

  openGameMenu(): void{
    this.store.dispatch(openGameMenu());
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}


