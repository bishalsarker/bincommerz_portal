import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AccountComponent } from "./components/settings/account/account.component";
import { DomainsComponent } from "./components/settings/domains/domains.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { ShopComponent } from "./components/settings/shop/shop.component";
import { SubscriptionDetailsComponent } from "./components/settings/subscription-details/subscription-details.component";
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
          },
          {
            path: "domains",
            component: DomainsComponent
          },
          {
            path: "subscription",
            component: SubscriptionDetailsComponent
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
