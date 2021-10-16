import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WidgetCardListComponent } from './widget-card-list/widget-card-list.component';
import { WidgetsComponent } from './widgets.component';


const routes: Routes = [{
  path: "",
  component: WidgetsComponent,
  children: [
    {
      path: "",
      component: WidgetCardListComponent,
    },
    {
      path: "sliders",
      loadChildren: () =>
        import("./sliders/sliders.module").then((m) => m.SlidersModule),
    },
    // {
    //   path: "edit/:id",
    //   component: PageFormComponent,
    //   data: { editMode: true },
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetsRoutingModule { }
