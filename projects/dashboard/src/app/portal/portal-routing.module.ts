import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { PreviewComponent } from "./components/preview/preview.component";
import { AccountComponent } from "./components/settings/account/account.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { ShopComponent } from "./components/settings/shop/shop.component";
import { PortalComponent } from "./portal.component";

const routes: Routes = [
  {
    path: "",
    component: PortalComponent,
    children: [
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "preview",
        component: PreviewComponent
      },
      {
        path: 'settings',
        component: SettingsComponent,
        children: [
          {
            path: "",
            pathMatch: "full",
            redirectTo: "/dashboard/settings/shop"
          },
          {
            path: "account",
            component: AccountComponent
          },
          {
            path: "shop",
            component: ShopComponent
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortalRoutingModule {}
