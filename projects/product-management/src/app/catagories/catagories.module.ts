import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CatagoriesRoutingModule } from "./catagories-routing.module";
import { CatagoriesComponent } from "./catagories.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { NgSelectModule } from "@ng-select/ng-select";
import { SubcatListComponent } from './components/subcat-list/subcat-list.component';
import { SubcatFormComponent } from './components/subcat-form/subcat-form.component';

@NgModule({
  declarations: [CatagoriesComponent, CategoryListComponent, CategoryFormComponent, SubcatListComponent, SubcatFormComponent],
  imports: [
    CommonModule,
    CatagoriesRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class CatagoriesModule {}
