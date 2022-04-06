import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponsRoutingModule } from './coupons-routing.module';
import { CouponsComponent } from './coupons.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared/shared.module';
import { CouponListComponent } from './components/coupon-list/coupon-list.component';
import { CouponFormComponent } from './components/coupon-form/coupon-form.component';


@NgModule({
  declarations: [CouponsComponent, CouponListComponent, CouponFormComponent],
  imports: [
    CommonModule,
    CouponsRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule,
  ]
})
export class CouponsModule { }
