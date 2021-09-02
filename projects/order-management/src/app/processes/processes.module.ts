import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProcessesRoutingModule } from "./processes-routing.module";
import { ProcessesComponent } from "./processes.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [ProcessesComponent],
  imports: [CommonModule, ProcessesRoutingModule, HttpClientModule],
})
export class ProcessesModule {}
