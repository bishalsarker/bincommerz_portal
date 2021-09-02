import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AUTH_HOST } from "src/app/constants/api-constants";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public siteInfo: BehaviorSubject<any> = new BehaviorSubject<any>(null);

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
        this.siteInfo.next(response.data);
      });
  }

  getShopInfoObservable(): Observable<any> {
    return this.httpClient
      .get(AUTH_HOST + "auth/shopinfo", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response: any) => {
          this.siteInfo.next(response.data);
          return response.data;
        })
      );
  }
}
