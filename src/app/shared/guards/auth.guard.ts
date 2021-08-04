import { NgLocalization } from "@angular/common";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CLIENT_ID } from "src/app-config";
import { AUTH_HOST } from "src/app/constants/api-constants";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.validateToken().pipe(
      map((x) => {
        if (x) {
          return true;
        } else {
          window.location.href = `${AUTH_HOST}account?return_uri=${state.url}&client=${CLIENT_ID}`;
          return false;
        }
      })
    );
  }
}
