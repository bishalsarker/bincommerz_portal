import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ImageGalleryComponent } from "./components/image-gallery/image-gallery.component";
import { ProductFormComponent } from "./components/product-form/product-form.component";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { ProductsComponent } from "./products.component";

const routes: Routes = [
  {
    path: "",
    component: ProductsComponent,
    children: [
      {
        path: "",
        component: ProductListComponent,
      },
      {
        path: "add",
        component: ProductFormComponent,
        data: { editMode: false },
      },
      {
        path: "edit/:id",
        component: ProductFormComponent,
        data: { editMode: true },
      },
      {
        path: "image_gallery/:id",
        component: ImageGalleryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
