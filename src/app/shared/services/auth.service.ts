import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AUTH_HOST } from "src/app/constants/api-constants";

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
        localStorage.setItem("shop_id", data.shopId);
      });
  }
}
