import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CatagoriesComponent } from "./catagories.component";
import { CategoryFormComponent } from "./components/category-form/category-form.component";
import { CategoryListComponent } from "./components/category-list/category-list.component";

const routes: Routes = [
  {
    path: "",
    component: CatagoriesComponent,
    children: [
      {
        path: "",
        component: CategoryListComponent,
      },
      {
        path: "add",
        component: CategoryFormComponent,
        data: { editMode: false },
      },
      {
        path: "edit/:id",
        component: CategoryFormComponent,
        data: { editMode: true },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatagoriesRoutingModule {}
