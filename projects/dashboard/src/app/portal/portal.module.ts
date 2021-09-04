import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PortalRoutingModule } from "./portal-routing.module";
import { PortalComponent } from "./portal.component";
import { ChartsModule } from "ng2-charts";
import { SettingsComponent } from "./components/settings/settings.component";
import { HomeComponent } from "./components/home/home.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [PortalComponent, SettingsComponent, HomeComponent],
  imports: [
    CommonModule,
    PortalRoutingModule,
    ChartsModule,
    ReactiveFormsModule,
  ],
})
export class PortalModule {}
