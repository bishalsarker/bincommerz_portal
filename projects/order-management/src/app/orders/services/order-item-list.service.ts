import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ITableColumn } from "../../shared/interfaces/data-table";

@Injectable({
  providedIn: "root",
})
export class OrderItemListService {
  columnConfig$ = new BehaviorSubject<ITableColumn[]>([
    {
      columnName: "Product Name",
      propertyName: "name",
    },
    {
      columnName: "Unit Price",
      propertyName: "price",
      filter: (item) => `${item.price} Tk`
    },
    {
      columnName: "Quantity",
      propertyName: "quantity",
    },
    {
      columnName: "Discount",
      propertyName: "discountAmount",
      filter: (item) => `-${item.discountAmount} Tk`
    },
    {
      columnName: "Sub Total",
      propertyName: "subtotal",
      filter: (item) => `${item.subtotal} Tk`
    }
  ]);

  constructor() {}
}
