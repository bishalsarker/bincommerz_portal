import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryChargeFormComponent } from './components/delivery-charge-form/delivery-charge-form.component';
import { DeliveryChargeListComponent } from './components/delivery-charge-list/delivery-charge-list.component';
import { DeliveryChargesComponent } from './delivery-charges.component';

const routes: Routes = [{
  path: "",
  component: DeliveryChargesComponent,
  children: [
    {
        path: "",
        component: DeliveryChargeListComponent
    },
    {
        path: "add",
        component: DeliveryChargeFormComponent,
        data: { editMode: false },
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryChargesRoutingModule { }
