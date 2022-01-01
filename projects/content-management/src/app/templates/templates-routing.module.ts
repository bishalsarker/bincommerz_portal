import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateFromComponent } from './components/template-from/template-from.component';
import { TemplateListComponent } from './components/template-list/template-list.component';
import { TemplatesComponent } from './templates.component';

const routes: Routes = [{
    path: "",
    component: TemplatesComponent,
    children: [
        {
            path: "",
            component: TemplateListComponent,
        },
        {
          path: "add",
          component: TemplateFromComponent,
          data: { editMode: false },
        },
        {
          path: "edit/:id",
          component: TemplateFromComponent,
          data: { editMode: true },
        }
    ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule { }
