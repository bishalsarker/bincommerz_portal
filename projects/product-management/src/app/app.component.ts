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
    // {
    //   title: "Inventory",
    //   icon: "fas fa-warehouse",
    //   route: "/inventory",
    //   isActive: false,
    // },
    {
      title: "Products",
      icon: "fas fa-tshirt",
      route: "/products",
      isActive: false,
    },
    {
      title: "Tags",
      icon: "fas fa-tags",
      route: "/tags",
      isActive: false,
    },
    {
      title: "Categories",
      icon: "fas fa-copy",
      route: "/categories",
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
