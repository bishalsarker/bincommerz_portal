import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SlideFormComponent } from './components/slide-form/slide-form.component';
import { SlideListComponent } from './components/slide-list/slide-list.component';
import { SliderFormComponent } from './components/slider-form/slider-form.component';
import { SliderListComponent } from './components/slider-list/slider-list.component';
import { SlidersComponent } from './sliders.component';

const routes: Routes = [{
  path: "",
  component: SlidersComponent,
  children: [
    {
      path: "",
      component: SliderListComponent,
    },
    {
      path: "add",
      component: SliderFormComponent,
      data: { editMode: false },
    },
    {
      path: "edit/:id",
      component: SliderFormComponent,
      data: { editMode: true },
    },
    {
      path: "slides/list/:id",
      component: SlideListComponent,
      data: { editMode: true },
    },
    {
      path: "slides/add",
      component: SlideFormComponent,
      data: { editMode: false },
    },
    {
      path: "slides/edit/:id",
      component: SlideFormComponent,
      data: { editMode: true },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlidersRoutingModule { }
