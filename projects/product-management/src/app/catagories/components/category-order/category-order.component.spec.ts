import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryOrderComponent } from './category-order.component';

describe('CategoryOrderComponent', () => {
  let component: CategoryOrderComponent;
  let fixture: ComponentFixture<CategoryOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
