import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsCardListComponent } from './settings-card-list/settings-card-list.component';
import { SettingsComponent } from './settings.component';


const routes: Routes = [{
  path: "",
  component: SettingsComponent,
  children: [
    {
      path: "",
      component: SettingsCardListComponent,
    },
    {
      path: "delivery-charges",
      loadChildren: () =>
        import("./delivery-charges/delivery-charges.module").then((m) => m.DeliveryChargesModule),
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
