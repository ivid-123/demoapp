import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosGraphPageComponent } from './videos-graph-page.component';

describe('VideosGraphPageComponent', () => {
  let component: VideosGraphPageComponent;
  let fixture: ComponentFixture<VideosGraphPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosGraphPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosGraphPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
