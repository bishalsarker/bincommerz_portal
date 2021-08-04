import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IMenuItem } from "../../interfaces/menu-item";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  @Input() public menuItems: IMenuItem[] = [];

  public toggleSidebar: boolean = false;

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit() {}

  public toggleMenu(): void {
    this.toggleSidebar = !this.toggleSidebar;
  }

  public onMenuClick(menuItem: IMenuItem): void {
    this.menuItems = this.menuItems.map((menu) => {
      return {
        title: menu.title,
        icon: menu.icon,
        route: menu.route,
        isActive: menu.title === menuItem.title,
      };
    });

    this.router.navigateByUrl(menuItem.route);
  }

  get shopId(): string {
    return localStorage.getItem("shop_id");
  }
}
