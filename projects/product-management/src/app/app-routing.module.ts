import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthCallbackComponent } from "./shared/components/auth-callback/auth-callback.component";
import { AuthGuard } from "./shared/guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/products",
  },
  {
    path: "tags",
    loadChildren: () => import("./tags/tags.module").then((m) => m.TagsModule),
    canActivate: [AuthGuard],
  },
  {
    path: "products",
    loadChildren: () =>
      import("./products/products.module").then((m) => m.ProductsModule),
    canActivate: [AuthGuard],
  },
  {
    path: "categories",
    loadChildren: () =>
      import("./catagories/catagories.module").then((m) => m.CatagoriesModule),
    canActivate: [AuthGuard],
  },
  {
    path: "auth-callback",
    component: AuthCallbackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
