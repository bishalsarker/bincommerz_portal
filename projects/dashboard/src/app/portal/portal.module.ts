import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PortalRoutingModule } from "./portal-routing.module";
import { PortalComponent } from "./portal.component";
import { ChartsModule } from "ng2-charts";
import { SettingsComponent } from "./components/settings/settings.component";
import { HomeComponent } from "./components/home/home.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AccountComponent } from './components/settings/account/account.component';
import { ShopComponent } from './components/settings/shop/shop.component';
import { DomainsComponent } from './components/settings/domains/domains.component';
import { SharedModule } from "projects/dashboard/src/app/shared/shared.module";
import { SubscriptionDetailsComponent } from './components/settings/subscription-details/subscription-details.component';

@NgModule({
  declarations: [PortalComponent, SettingsComponent, HomeComponent, AccountComponent, ShopComponent, DomainsComponent, SubscriptionDetailsComponent],
  imports: [
    CommonModule,
    PortalRoutingModule,
    ChartsModule,
    ReactiveFormsModule,
    SharedModule
  ],
})
export class PortalModule {}
