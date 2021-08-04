import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./shared/guards/auth.guard";
import { AuthCallbackComponent } from "./shared/components/auth-callback/auth-callback.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    loadChildren: () =>
      import("./portal/portal.module").then((m) => m.PortalModule),
    canActivate: [AuthGuard],
  },
  {
    path: "auth-callback",
    pathMatch: "full",
    component: AuthCallbackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
