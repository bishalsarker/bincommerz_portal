import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageFormComponent } from './components/page-form/page-form.component';
import { PageListComponent } from './components/page-list/page-list.component';
import { PagesComponent } from './pages.component';


const routes: Routes = [{
  path: "",
  component: PagesComponent,
  children: [
    {
      path: "",
      component: PageListComponent,
    },
    {
      path: "add",
      component: PageFormComponent,
      data: { editMode: false },
    },
    {
      path: "edit/:id",
      component: PageFormComponent,
      data: { editMode: true },
    },
  ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
