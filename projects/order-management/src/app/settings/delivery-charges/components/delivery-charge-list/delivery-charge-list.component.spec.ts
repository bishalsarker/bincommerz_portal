import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryChargeListComponent } from './delivery-charge-list.component';

describe('DeliveryChargeListComponent', () => {
  let component: DeliveryChargeListComponent;
  let fixture: ComponentFixture<DeliveryChargeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryChargeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryChargeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
