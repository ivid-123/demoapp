import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCardOrientationComponent } from './single-card-orientation.component';

describe('SingleCardOrientationComponent', () => {
  let component: SingleCardOrientationComponent;
  let fixture: ComponentFixture<SingleCardOrientationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleCardOrientationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCardOrientationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
