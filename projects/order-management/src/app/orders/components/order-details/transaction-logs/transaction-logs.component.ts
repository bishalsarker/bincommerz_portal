import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { BreadcrumbService } from "projects/dashboard/src/app/shared/services/breadcrumb.service";
import { BehaviorSubject } from "rxjs";
import { OrderPayment } from "../../../interfaces/order";
import { OrderDataService } from "../../../services/order-data.service";
import { TransactionLogService } from "../../../services/transaction-log.service";

@Component({
  selector: "app-transaction-logs",
  templateUrl: "./transaction-logs.component.html",
  styleUrls: ["./transaction-logs.component.scss"],
})
export class TransactionLogsComponent implements OnInit, OnDestroy {
  orderId: string = null;
  transactionLogs$ = new BehaviorSubject<OrderPayment[]>(null);

  constructor(
    public orderDataService: OrderDataService,
    public transactionLogService: TransactionLogService,
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param: ParamMap) => {
      const orderid: string = param["orderid"];
      this.orderId = orderid;
      this.orderDataService
        .getTransactionLog(orderid)
        .subscribe((data) => this.transactionLogs$.next(data));

      this.breadcrumbService.addBreadcrumb({
        title: "Transactions",
        route: "",
      });
    });
  }

  ngOnDestroy() {
    this.breadcrumbService.removeLast();
  }
}
