import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { BreadcrumbService } from "../../../shared/services/breadcrumb.service";
import { OrderDataService } from "../../services/order-data.service";

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.scss"],
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    public orderService: OrderDataService,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param: ParamMap) => {
      const orderid: string = param["id"];
      this.orderService.selectedOrderId.next(orderid);
      this.breadcrumbService.addBreadcrumb({
        title: orderid,
        route: "",
      });
    });
  }

  ngOnDestroy() {
    this.breadcrumbService.removeLast();
  }
}
