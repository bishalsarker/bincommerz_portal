import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { ITableColumn, ITableColumnAction } from "../../shared/interfaces/data-table";
import { Product } from "../interfaces/product";
import { ProductDataService } from "./product-data.service";

@Injectable({
  providedIn: "root",
})
export class ProductListService {
  columnConfig$ = new BehaviorSubject<ITableColumn[]>([
    {
      columnName: "Name",
      propertyName: "name",
    },
    {
      columnName: "Price",
      propertyName: "price",
      filter: (data: Product) => data.price + " Tk",
    },
    {
      columnName: "Discount",
      propertyName: "discount",
      filter: (data: Product) => data.discount + " %",
    },
    {
      columnName: "Stock Quantity",
      propertyName: "stockQuantity",
      template: {
        type: 'stock-quantity'
      }
    },
    {
      columnName: "Tags",
      propertyName: "tags",
      filter: (data: Product) =>
        data.tags && data.tags.length > 0 ? data.tags.join(", ") : "n/a",
    },
    {
      columnName: "Image",
      propertyName: "image",
      template: {
        type: "image",
      },
      filter: (data: Product) =>
        this.productDataService.resolveProductImage(data),
    },
  ]);

  tableActions$ = new BehaviorSubject<ITableColumnAction[]>([
    {
      icon: "",
      title: "Image Gallery",
      showActions: () => true,
      predicate: (item: any) => true,
      do: (item: Product) => {
        this.router.navigate(["/products/image_gallery/" + item.id]);
      },
    },
    {
      icon: "",
      title: "Edit",
      showActions: () => true,
      predicate: (item: any) => true,
      do: (item: Product) => {
        this.router.navigate(["/products/edit/" + item.id]);
      },
    },
    {
      icon: "",
      title: "Delete",
      showActions: () => true,
      predicate: (item: any) => true,
      do: (item: Product) => {
        if(confirm("Are you sure?")) {
          this.productDataService.deleteTag(item.id).subscribe();
        }
      },
    },
  ]);

  constructor(
    private router: Router,
    private productDataService: ProductDataService
  ) {}
}
