import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcatFormComponent } from './subcat-form.component';

describe('SubcatFormComponent', () => {
  let component: SubcatFormComponent;
  let fixture: ComponentFixture<SubcatFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcatFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
