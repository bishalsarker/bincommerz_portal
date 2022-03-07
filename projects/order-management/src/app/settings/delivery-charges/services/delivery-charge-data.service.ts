import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Template } from 'plotly.js';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_HOST } from '../../../constants/api-constants';
import { DeliveryCharge } from '../interfaces/delivery-charge';

@Injectable({
  providedIn: 'root'
})
export class DeliveryChargeDataService {
  deliveryCharges$ = new BehaviorSubject<DeliveryCharge[]>([]);
  
  constructor(
    private httpClient: HttpClient, 
    private toastr: ToastrService,
    private router: Router) 
  {
    this.getAllDeliveryCharges().subscribe();
  }

  getAllDeliveryCharges(): Observable<void> {
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
          } else {
            this.showError(response.message);
          }
        })
      );
  }

  addDeliveryCharge(payload: DeliveryCharge): Observable<boolean> {
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
            this.getAllDeliveryCharges().subscribe();
            this.router.navigate(["settings", "delivery-charges"]);
            this.toastr.success(`New template added`);
            return true;
          }
        })
      );
  }

  updateDeliveryCharge(payload: DeliveryCharge): Observable<boolean> {
    return this.httpClient
      .put<any>(API_HOST + "templates/update", {
        id: payload.id,
        templateData: payload
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
            this.getAllDeliveryCharges().subscribe();
            this.router.navigate(["templates"]);
            this.toastr.success(`Template updated`);
            return true;
          }
        })
      );
  }

  private showError(message: string): void {
    this.toastr.error("", "Error occured: " + message);
  }
}
