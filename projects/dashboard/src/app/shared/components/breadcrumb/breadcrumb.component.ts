import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IBreadcrumbItem } from "../../interfaces/breadcrumb";

@Component({
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.scss"],
})
export class BreadcrumbComponent implements OnInit {
  @Input() public breadcrumbs: IBreadcrumbItem[] = [];

  constructor(private router: Router) {}

  ngOnInit() {}

  public hasRoute(breadcrumb: IBreadcrumbItem): boolean {
    return breadcrumb.route.trim().length !== 0 ? true : false;
  }

  public navigate({ route }: IBreadcrumbItem): void {
    console.log(route);
    this.router.navigateByUrl(route);
  }
}
