import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOrientation3Component } from './card-orientation3.component';

describe('CardOrientation3Component', () => {
  let component: CardOrientation3Component;
  let fixture: ComponentFixture<CardOrientation3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardOrientation3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOrientation3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
