import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { WidgetsComponent } from './widgets.component';
import { SharedModule } from '../shared/shared.module';
import { WidgetCardListComponent } from './widget-card-list/widget-card-list.component';

@NgModule({
  declarations: [WidgetsComponent, WidgetCardListComponent],
  imports: [
    CommonModule,
    WidgetsRoutingModule,
    SharedModule
  ]
})
export class WidgetsModule { }