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
      columnName: "Quantity",
      propertyName: "quantity",
    },
    {
      columnName: "Discount",
      propertyName: "discount",
    },
    {
      columnName: "Price",
      propertyName: "price",
    },
  ]);

  constructor() {}
}
