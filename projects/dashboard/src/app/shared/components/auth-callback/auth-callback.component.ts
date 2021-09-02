import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-auth-callback",
  templateUrl: "./auth-callback.component.html",
  styleUrls: ["./auth-callback.component.scss"],
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log("callback accessed");
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      const auth_token: string = params.get("code");
      const state: string = params.get("state");

      if (auth_token && auth_token.trim() !== "") {
        localStorage.setItem("auth_token", auth_token);
        this.authService.getUserInfo();
        this.authService.getShopInfo();
        this.router.navigate([state]);
      }
    });
  }
}
