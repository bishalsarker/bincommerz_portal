import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PortalRoutingModule } from "./portal-routing.module";
import { PortalComponent } from "./portal.component";
import { PlotlyModule } from "angular-plotly.js";
import { ChartsModule } from "ng2-charts";

@NgModule({
  declarations: [PortalComponent],
  imports: [CommonModule, PortalRoutingModule, ChartsModule],
})
export class PortalModule {}
