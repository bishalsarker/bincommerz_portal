import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPaymentFormComponent } from './order-payment-form.component';

describe('OrderPaymentFormComponent', () => {
  let component: OrderPaymentFormComponent;
  let fixture: ComponentFixture<OrderPaymentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPaymentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
