import { Component } from "@angular/core";
import { Router, RouterEvent } from "@angular/router";
import { IMenuItem } from "./shared/interfaces/menu-item";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  public toggleSidebar: boolean = false;
  menuItems: IMenuItem[] = [
    {
      title: "Orders",
      icon: "fas fa-boxes",
      route: "/orders",
      isActive: false,
    },
    {
      title: "Settings",
      icon: "fas fa-cogs",
      route: "/settings",
      isActive: false,
    },
    {
      title: "Coupons",
      icon: "fas fa-money-bill-alt",
      route: "/coupons",
      isActive: false,
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((e: RouterEvent) => {
      if (e.url) {
        if (e.url === "/") {
          this.menuItems[0].isActive = true;
        } else {
          this.setActiveMenuItem(e.url);
        }
      }
    });
  }

  public toggleMenu(): void {
    this.toggleSidebar = !this.toggleSidebar;
  }

  private setActiveMenuItem(currentUrl: string): void {
    const activeMenuFound: boolean = false;
    this.menuItems.forEach((menuItem) => {
      menuItem.isActive = false;
      if (!activeMenuFound) {
        if (currentUrl.includes(menuItem.route)) {
          menuItem.isActive = true;
        }
      }
    });
  }
}
