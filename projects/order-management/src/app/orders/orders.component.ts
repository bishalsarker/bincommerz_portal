import { Component, OnInit } from "@angular/core";
import { BreadcrumbService } from "../shared/services/breadcrumb.service";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit {
  constructor(public breadCrumbService: BreadcrumbService) {}

  ngOnInit() {
    this.breadCrumbService.addBreadcrumb({
      title: "Orders",
      route: "/orders",
    });
  }

  ngOnDestroy(): void {
    this.breadCrumbService.removeLast();
  }
}
