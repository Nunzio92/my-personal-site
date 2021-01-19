import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-star-war',
  templateUrl: './star-war.component.html',
  styleUrls: ['./star-war.component.scss'],
})
export class StarWarComponent implements OnInit, AfterViewInit {



  constructor(private elementRef: ElementRef,
              private store: Store) {
  }

  ngOnInit(): void {
    // this.store.dispatch(openModal());
  }

  ngAfterViewInit() {

  }


}

