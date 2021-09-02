import { NgLocalization } from "@angular/common";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { CLIENT_ID } from "projects/dashboard/src/app-config";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AUTH_HOST } from "../../constants/api-constants";
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
