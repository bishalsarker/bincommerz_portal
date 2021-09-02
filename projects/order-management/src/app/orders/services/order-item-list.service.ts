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

  // tableActions$ = new BehaviorSubject<ITableColumnAction[]>([
  //   {
  //     icon: "",
  //     title: "Edit",
  //     predicate: (item: any) => true,
  //     do: (item: Product) => {
  //       this.router.navigate(["/products/edit/" + item.id]);
  //     },
  //   },
  //   {
  //     icon: "",
  //     title: "Delete",
  //     predicate: (item: any) => true,
  //     do: (item: Product) => {
  //       this.productDataService.deleteTag(item.id).subscribe();
  //     },
  //   },
  // ]);

  constructor() {}
}
