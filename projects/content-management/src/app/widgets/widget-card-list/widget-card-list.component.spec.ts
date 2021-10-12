import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetCardListComponent } from './widget-card-list.component';

describe('WidgetCardListComponent', () => {
  let component: WidgetCardListComponent;
  let fixture: ComponentFixture<WidgetCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
