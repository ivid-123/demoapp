import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOrientation4Component } from './card-orientation4.component';

describe('CardOrientation4Component', () => {
  let component: CardOrientation4Component;
  let fixture: ComponentFixture<CardOrientation4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardOrientation4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOrientation4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
