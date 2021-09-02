import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TagsRoutingModule } from "./tags-routing.module";
import { SharedModule } from "../shared/shared.module";
import { TagsComponent } from "./tags.component";
import { TagsListComponent } from "./components/tags-list/tags-list.component";
import { TagFormComponent } from "./components/tag-form/tag-form.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [TagsComponent, TagsListComponent, TagFormComponent],
  imports: [CommonModule, TagsRoutingModule, ReactiveFormsModule, SharedModule],
})
export class TagsModule {}
