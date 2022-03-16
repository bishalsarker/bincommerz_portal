import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCardListComponent } from './settings-card-list.component';

describe('SettingsCardListComponent', () => {
  let component: SettingsCardListComponent;
  let fixture: ComponentFixture<SettingsCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
