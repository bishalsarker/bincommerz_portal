import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AUTH_HOST } from "projects/order-management/src/app/constants/api-constants";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  validateToken(): Observable<boolean> {
    return this.httpClient
      .get(AUTH_HOST + "auth/verify", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((x) => true),
        catchError((err) => of(false))
      );
  }

  signOut(): void {
    localStorage.setItem("auth_token", "");
    location.reload();
  }

  getUserInfo(): void {
    this.httpClient
      .get(AUTH_HOST + "auth/userinfo", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .subscribe((data: any) => {
        localStorage.setItem("user_name", data.userName);
        localStorage.setItem("subscription_plan", data.subscriptionPlan);
      });
  }

  getShopInfo(): void {
    this.httpClient
      .get(AUTH_HOST + "auth/shopinfo", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .subscribe((response: any) => {
        localStorage.setItem("shop_id", response.data.id);
      });
  }

  getSubscriptionStatus(): Observable<any> {
    return this.httpClient
      .get(AUTH_HOST + "subscriptions/status", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
    });
  }
}
