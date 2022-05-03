import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_HOST } from '../../constants/api-constants';
import { LoaderService } from '../../shared/services/loader.service';
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
    private loaderService: LoaderService,
    private router: Router) { 
      this.getAllCoupons().subscribe();
  }

  getAllCoupons(): Observable<void> {
    this.loaderService.isLoading.next(true);
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
            this.loaderService.isLoading.next(false);
          } else {
            this.showError(response.message);
          }
        })
      );
  }

  getCoupon(couponId: string): Observable<Coupon> {
    this.loaderService.isLoading.next(true);
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
            this.loaderService.isLoading.next(false);
            return response.data as Coupon;
          } else {
            this.showError(response.message);
            return null;
          }
        })
      );
  }

  addCoupon(payload: Coupon): Observable<boolean> {
    this.loaderService.isLoading.next(true);
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
            this.loaderService.isLoading.next(false);
            this.getAllCoupons().subscribe();
            this.router.navigate(["coupons"]);
            this.toastr.success(`New coupon added`);
            return true;
          }
        })
      );
  }

  updateCoupon(couponId: string, payload: Coupon): Observable<boolean> {
    this.loaderService.isLoading.next(true);
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
            this.loaderService.isLoading.next(false);
            this.getAllCoupons().subscribe();
            this.router.navigate(["coupons"]);
            this.toastr.success(`Coupon updated`);
            return true;
          }
        })
      );
  }

  public deleteCoupon(couponId: string): Observable<void> {
    this.loaderService.isLoading.next(true);
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
            this.loaderService.isLoading.next(false);
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
