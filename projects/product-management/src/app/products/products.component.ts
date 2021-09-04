import { Component, OnDestroy, OnInit } from "@angular/core";
import { IBreadcrumbItem } from "../shared/interfaces/breadcrumb";
import { BreadcrumbService } from "../shared/services/breadcrumb.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit, OnDestroy {
  constructor(public breadCrumbService: BreadcrumbService) {}

  ngOnInit() {
    this.breadCrumbService.addBreadcrumb({
      title: "Products",
      route: "/products",
    });
  }

  ngOnDestroy(): void {
    this.breadCrumbService.removeLast();
  }
}
