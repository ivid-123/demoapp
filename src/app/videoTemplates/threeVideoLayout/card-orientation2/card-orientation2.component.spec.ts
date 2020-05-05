import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOrientation2Component } from './card-orientation2.component';

describe('CardOrientation2Component', () => {
  let component: CardOrientation2Component;
  let fixture: ComponentFixture<CardOrientation2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardOrientation2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOrientation2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
