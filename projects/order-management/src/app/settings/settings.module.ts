import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared/shared.module';
import { SettingsCardListComponent } from './settings-card-list/settings-card-list.component';


@NgModule({
  declarations: [SettingsComponent, SettingsCardListComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule,
  ]
})
export class SettingsModule { }
