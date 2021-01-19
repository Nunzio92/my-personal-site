import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarWarComponent } from './star-war.component';

describe('StarWarComponent', () => {
  let component: StarWarComponent;
  let fixture: ComponentFixture<StarWarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarWarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarWarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
