import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryChargesRoutingModule } from './delivery-charges-routing.module';
import { DeliveryChargesComponent } from './delivery-charges.component';
import { DeliveryChargeListComponent } from './components/delivery-charge-list/delivery-charge-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../shared/shared.module';
import { DeliveryChargeFormComponent } from './components/delivery-charge-form/delivery-charge-form.component';


@NgModule({
  declarations: [DeliveryChargesComponent, DeliveryChargeListComponent, DeliveryChargeFormComponent],
  imports: [
    CommonModule,
    DeliveryChargesRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule
  ]
})
export class DeliveryChargesModule { }
