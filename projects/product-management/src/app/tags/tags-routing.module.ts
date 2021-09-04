import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TagFormComponent } from "./components/tag-form/tag-form.component";
import { TagsListComponent } from "./components/tags-list/tags-list.component";
import { TagsComponent } from "./tags.component";

const routes: Routes = [
  {
    path: "",
    component: TagsComponent,
    children: [
      {
        path: "",
        component: TagsListComponent,
      },
      {
        path: "add",
        component: TagFormComponent,
        data: { editMode: false },
      },
      {
        path: "edit/:id",
        component: TagFormComponent,
        data: { editMode: true },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagsRoutingModule {}
