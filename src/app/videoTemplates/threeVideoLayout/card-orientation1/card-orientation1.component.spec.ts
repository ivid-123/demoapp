import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOrientation1Component } from './card-orientation1.component';

describe('CardOrientation1Component', () => {
  let component: CardOrientation1Component;
  let fixture: ComponentFixture<CardOrientation1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardOrientation1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOrientation1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
