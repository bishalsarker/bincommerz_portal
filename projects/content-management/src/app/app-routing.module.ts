import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthCallbackComponent } from "./shared/components/auth-callback/auth-callback.component";
import { AuthGuard } from "./shared/guards/auth.guard";
import { SubscriptionCheckGuard } from "./shared/guards/subscription-check.guard";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/pages",
  },
  {
    path: "pages",
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
    canActivate: [AuthGuard, SubscriptionCheckGuard],
  },
  {
    path: "widgets",
    loadChildren: () =>
      import("./widgets/widgets.module").then((m) => m.WidgetsModule),
    canActivate: [AuthGuard, SubscriptionCheckGuard],
  },
  {
    path: "templates",
    loadChildren: () =>
      import("./templates/templates.module").then((m) => m.TemplatesModule),
    canActivate: [AuthGuard, SubscriptionCheckGuard],
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
