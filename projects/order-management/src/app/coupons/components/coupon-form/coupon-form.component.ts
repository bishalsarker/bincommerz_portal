import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { BreadcrumbService } from '../../../shared/services/breadcrumb.service';
import { CouponDataService } from '../../services/coupon-data.service';

@Component({
  selector: 'app-coupon-form',
  templateUrl: './coupon-form.component.html',
  styleUrls: ['./coupon-form.component.scss']
})
export class CouponFormComponent implements OnInit {
  couponId = new BehaviorSubject<string>(null);
  loading$ = new BehaviorSubject<boolean>(false);
  disableAddBtn: boolean = false;
  buttonText: string = "Save";

  couponForm = new FormGroup({
    coupon: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    discount: new FormControl(0, Validators.required),
    isActive: new FormControl(false)
  });

  constructor(
    private breadCrumbService: BreadcrumbService,
    private couponDataService: CouponDataService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.breadCrumbService.addBreadcrumb({
      title: this.isEditMode ? "Edit" : "Add",
      route: "",
    });

    if (this.isEditMode) {
      this.route.params.subscribe((param: ParamMap) => {
        const couponid: string = param["id"];
        this.couponId.next(couponid);
        this.getCouponById();
      });
    }

    this.buttonText =  this.isEditMode ? "Update" : "Save";
  }

  getCouponById(): void {
    this.couponDataService.getCoupon(this.couponId.value).subscribe((coupon) => {
      if (coupon) {
        this.couponControl.setValue(coupon.code);
        this.discountControl.setValue(coupon.discount);
        this.isActiveControl.setValue(coupon.isActive);
      }
    });
  }

  ngOnDestroy(): void {
    this.breadCrumbService.removeLast();
  }

  get isEditMode(): boolean {
    return this.route.snapshot.data["editMode"];
  }

  get couponControl(): AbstractControl {
    return this.couponForm.get("coupon");
  }

  get discountControl(): AbstractControl {
    return this.couponForm.get("discount");
  }

  get isActiveControl(): AbstractControl {
    return this.couponForm.get("isActive");
  }

  addOrUpdateCoupon(): void {
    this.disableAddBtn = true;
    this.buttonText = "Saving...";

    const add: Observable<boolean> = this.isEditMode
      ? this.updateCoupon()
      : this.addCoupon();

    add.subscribe((isSuccess: boolean) => {
      if (!isSuccess) {
        this.disableAddBtn = false;
        this.buttonText = "Save";
      }
    }, () => {
      this.disableAddBtn = false;
      this.buttonText = "Save";
    });
  }

  addCoupon(): Observable<boolean> {
    return this.couponDataService.addCoupon({
      code: this.couponControl.value,
      discount: this.discountControl.value,
      isActive: this.isActiveControl.value
    });
  }

  updateCoupon(): Observable<boolean> {
    return this.couponDataService.updateCoupon(this.couponId.value, {
      code: this.couponControl.value,
      discount: this.discountControl.value,
      isActive: this.isActiveControl.value
    });
  }
}