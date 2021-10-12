import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlidersRoutingModule } from './sliders-routing.module';
import { SliderListComponent } from './components/slider-list/slider-list.component';
import { SlidersComponent } from './sliders.component';
import { SliderFormComponent } from './components/slider-form/slider-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SlideListComponent } from './components/slide-list/slide-list.component';
import { SlideFormComponent } from './components/slide-form/slide-form.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [SliderListComponent, SlidersComponent, SliderFormComponent, SlideListComponent, SlideFormComponent],
  imports: [
    CommonModule,
    SlidersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgSelectModule,
  ]
})
export class SlidersModule { }
