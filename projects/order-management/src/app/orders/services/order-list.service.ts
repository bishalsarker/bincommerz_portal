import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { format } from "date-fns";
import { BehaviorSubject } from "rxjs";
import { ITableColumn, ITableColumnAction } from "../../shared/interfaces/data-table";
import { Order } from "../interfaces/order";
import { OrderDataService } from "./order-data.service";

@Injectable({
  providedIn: "root",
})
export class OrderListService {
  inboxColumnConfig$ = new BehaviorSubject<ITableColumn[]>([
    {
      columnName: "Order ID",
      propertyName: "id",
      template: {
        type: "link",
        config: {
          href: "/orders/details/:id",
        },
      },
    },
    {
      columnName: "Placed On",
      propertyName: "placedOn",
      filter: (data: Order) => format(data.placedOn, "MMM dd yyyy, hh:mm aaa"),
    },
    {
      columnName: "Status",
      propertyName: "status",
      template: {
        type: "badge",
      },
    },
    {
      columnName: "Total Payable",
      propertyName: "totalPayable",
      filter: (data: Order) => data.totalPayable + " Tk",
    },
  ]);

  deliveredColumnConfig$ = new BehaviorSubject<ITableColumn[]>([
    {
      columnName: "Order ID",
      propertyName: "id",
      template: {
        type: "link",
        config: {
          href: "/orders/details/:id",
        },
      },
    },
    {
      columnName: "Placed On",
      propertyName: "placedOn",
      filter: (data: Order) => format(data.placedOn, "MMM dd yyyy, hh:mm aaa"),
    }
  ]);
  
  canceledColumnConfig$ = new BehaviorSubject<ITableColumn[]>([
    {
      columnName: "Order ID",
      propertyName: "id",
      template: {
        type: "link",
        config: {
          href: "/orders/details/:id",
        },
      },
    },
    {
      columnName: "Placed On",
      propertyName: "placedOn",
      filter: (data: Order) => format(data.placedOn, "MMM dd yyyy, hh:mm aaa"),
    }
  ]);

  tableActions$ = new BehaviorSubject<ITableColumnAction[]>([
    {
      icon: "",
      title: "View",
      predicate: (item: any) => true,
      showAction: (item: Order) => true,
      do: (item: Order) => {
        this.router.navigate(["/orders/details/" + item.id]);
      },
    },
    {
      icon: "",
      title: "Delete",
      predicate: (item: any) => true,
      showAction: (item: Order) => item.isCanceled || item.isCompleted,
      do: (item: Order) => {
        if (confirm("Are you sure you want to delete this order? This action cannot be undone")) {
          this.orderDataService.deleteOrder(item.id).subscribe();
        }
      },
    },
  ]);

  constructor(
    private router: Router,
    private orderDataService: OrderDataService
  ) {}
}
