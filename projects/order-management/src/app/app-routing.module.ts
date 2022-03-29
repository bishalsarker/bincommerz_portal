import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./shared/guards/auth.guard";
import { AuthCallbackComponent } from "./shared/components/auth-callback/auth-callback.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/orders",
  },
  {
    path: "orders",
    loadChildren: () =>
      import("./orders/orders.module").then((m) => m.OrdersModule),
    canActivate: [AuthGuard],
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./settings/settings.module").then((m) => m.SettingsModule),
    canActivate: [AuthGuard],
  },
  {
    path: "coupons",
    loadChildren: () =>
      import("./coupons/coupons.module").then((m) => m.CouponsModule),
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
