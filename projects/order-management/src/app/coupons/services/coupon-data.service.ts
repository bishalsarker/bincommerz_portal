import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_HOST } from '../../constants/api-constants';
import { Coupon } from '../interfaces/coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponDataService {
  coupons$ = new BehaviorSubject<Coupon[]>([]);
  couponTypes$: BehaviorSubject<{name: string, value: string}[]> = new BehaviorSubject([
    {
      name: "Percentage",
      value: "percentage"
    },
    {
      name: "Fixed Amount",
      value: "amount"
    }
  ]);

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private router: Router) { 
      this.getAllCoupons().subscribe();
  }

  getAllCoupons(): Observable<void> {
    return this.httpClient
      .get<any>(API_HOST + "coupons/get/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            this.coupons$.next(response.data as Coupon[]);
          } else {
            this.showError(response.message);
          }
        })
      );
  }

  getCoupon(couponId: string): Observable<Coupon> {
    return this.httpClient
      .get<any>(API_HOST + "coupons/get/" + couponId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            return response.data as Coupon;
          } else {
            this.showError(response.message);
            return null;
          }
        })
      );
  }

  addCoupon(payload: Coupon): Observable<boolean> {
    return this.httpClient
      .post<any>(API_HOST + "coupons/add", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (!response.isSuccess) {
            this.showError(response.message);
            return false;
          } else {
            this.getAllCoupons().subscribe();
            this.router.navigate(["coupons"]);
            this.toastr.success(`New coupon added`);
            return true;
          }
        })
      );
  }

  updateCoupon(couponId: string, payload: Coupon): Observable<boolean> {
    return this.httpClient
      .put<any>(API_HOST + "coupons/update", {
        id: couponId,
        payload: payload
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (!response.isSuccess) {
            this.showError(response.message);
            return false;
          } else {
            this.getAllCoupons().subscribe();
            this.router.navigate(["coupons"]);
            this.toastr.success(`Coupon updated`);
            return true;
          }
        })
      );
  }

  public deleteCoupon(couponId: string): Observable<void> {
    return this.httpClient
      .delete<any>(API_HOST + "coupons/delete/" + couponId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (!response.isSuccess) {
            this.showError(response.message);
          } else {
            this.getAllCoupons().subscribe();
            this.router.navigate(["coupons"]);
            this.toastr.success(`Coupon deleted`);
          }
        })
      );
  }

  private showError(message: string): void {
    this.toastr.error("", "Error occured: " + message);
  }
}
