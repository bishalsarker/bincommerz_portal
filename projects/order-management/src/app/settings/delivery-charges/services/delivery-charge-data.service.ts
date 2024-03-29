import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_HOST } from '../../../constants/api-constants';
import { LoaderService } from '../../../shared/services/loader.service';
import { DeliveryCharge } from '../interfaces/delivery-charge';

@Injectable({
  providedIn: 'root'
})
export class DeliveryChargeDataService {
  deliveryCharges$ = new BehaviorSubject<DeliveryCharge[]>([]);
  
  constructor(
    private httpClient: HttpClient, 
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private router: Router) 
  {
    this.getAllDeliveryCharges().subscribe();
  }

  getAllDeliveryCharges(): Observable<void> {
    this.loaderService.isLoading.next(true);
    return this.httpClient
      .get<any>(API_HOST + "orders/settings/delivery-charge/get/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            this.deliveryCharges$.next(response.data as DeliveryCharge[]);
            this.loaderService.isLoading.next(false);
          } else {
            this.showError(response.message);
          }
        })
      );
  }

  getDeliveryCharge(deliveryChargeId: string): Observable<DeliveryCharge> {
    this.loaderService.isLoading.next(true);
    return this.httpClient
      .get<any>(API_HOST + "orders/settings/delivery-charge/get/" + deliveryChargeId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            this.loaderService.isLoading.next(false);
            return response.data as DeliveryCharge;
          } else {
            this.showError(response.message);
            return null;
          }
        })
      );
  }

  addDeliveryCharge(payload: DeliveryCharge): Observable<boolean> {
    this.loaderService.isLoading.next(true);
    return this.httpClient
      .post<any>(API_HOST + "orders/settings/delivery-charge/addnew", payload, {
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
            this.getAllDeliveryCharges().subscribe();
            this.router.navigate(["settings", "delivery-charges"]);
            this.toastr.success(`New template added`);
            return true;
          }
        })
      );
  }

  updateDeliveryCharge(payload: DeliveryCharge): Observable<boolean> {
    this.loaderService.isLoading.next(true);
    return this.httpClient
      .put<any>(API_HOST + "orders/settings/delivery-charge/update", {
        id: payload.id,
        payload: {
          title: payload.title,
          amount: payload.amount
        }
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
            this.getAllDeliveryCharges().subscribe();
            this.router.navigate(["settings", "delivery-charges"]);
            this.toastr.success(`Template updated`);
            return true;
          }
        })
      );
  }

  public deleteDeliveryCharge(deliveryChargeId: string): Observable<void> {
    this.loaderService.isLoading.next(true);
    return this.httpClient
      .delete<any>(API_HOST + "orders/settings/delivery-charge/delete/" + deliveryChargeId, {
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
            this.getAllDeliveryCharges().subscribe();
            this.router.navigate(["settings", "delivery-charges"]);
            this.toastr.success(`Template deleted`);
          }
        })
      );
  }

  private showError(message: string): void {
    this.toastr.error("", "Error occured: " + message);
  }
}
