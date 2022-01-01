import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateListComponent } from './components/template-list/template-list.component';
import { TemplateFromComponent } from './components/template-from/template-from.component';
import { TemplatesRoutingModule } from './templates-routing.module';
import { TemplatesComponent } from './templates.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [TemplateListComponent, TemplateFromComponent, TemplatesComponent],
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule
  ]
})

export class TemplatesModule { }
