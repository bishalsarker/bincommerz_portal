import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcatListComponent } from './subcat-list.component';

describe('SubcatListComponent', () => {
  let component: SubcatListComponent;
  let fixture: ComponentFixture<SubcatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcatListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
