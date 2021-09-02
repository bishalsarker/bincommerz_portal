import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnProcessComponent } from './btn-process.component';

describe('BtnProcessComponent', () => {
  let component: BtnProcessComponent;
  let fixture: ComponentFixture<BtnProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
