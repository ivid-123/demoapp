import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoCardOrientationComponent } from './two-card-orientation.component';

describe('TwoCardOrientationComponent', () => {
  let component: TwoCardOrientationComponent;
  let fixture: ComponentFixture<TwoCardOrientationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoCardOrientationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoCardOrientationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
