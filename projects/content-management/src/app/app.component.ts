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
      title: "Pages",
      icon: "fas fa-copy",
      route: "/pages",
      isActive: false,
    },
    {
      title: "Widgets",
      icon: "fas fa-hat-wizard",
      route: "/widgets",
      isActive: false,
    },
    {
      title: "Templates",
      icon: "fas fa-scroll",
      route: "/templates",
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
