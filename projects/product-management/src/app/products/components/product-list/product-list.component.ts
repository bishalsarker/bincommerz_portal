import { Component, OnInit } from "@angular/core";
import { ProductDataService } from "../../services/product-data.service";
import { ProductListService } from "../../services/product-list.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  constructor(
    public productListService: ProductListService,
    public productDataService: ProductDataService
  ) {}

  ngOnInit() {}
}
