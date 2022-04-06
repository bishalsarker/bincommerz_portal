import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CouponFormComponent } from './components/coupon-form/coupon-form.component';
import { CouponListComponent } from './components/coupon-list/coupon-list.component';
import { CouponsComponent } from './coupons.component';


const routes: Routes = [
  {
    path: "",
    component: CouponsComponent,
    children: [
      {
        path: "",
        component: CouponListComponent,
      },
      {
        path: "add",
        component: CouponFormComponent,
        data: { editMode: false },
      },
      {
        path: "edit/:id",
        component: CouponFormComponent,
        data: { editMode: true },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponsRoutingModule { }
