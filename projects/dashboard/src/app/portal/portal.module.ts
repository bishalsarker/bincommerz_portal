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
import { PreviewComponent } from './components/preview/preview.component';

@NgModule({
  declarations: [PortalComponent, SettingsComponent, HomeComponent, AccountComponent, ShopComponent, PreviewComponent],
  imports: [
    CommonModule,
    PortalRoutingModule,
    ChartsModule,
    ReactiveFormsModule,
  ],
})
export class PortalModule {}
