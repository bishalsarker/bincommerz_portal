import { Component, OnInit } from "@angular/core";
import { ProductDataService } from "../../services/product-data.service";
import { ProductListService } from "../../services/product-list.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  freeProductLimit: number = 15;

  constructor(
    public productListService: ProductListService,
    public productDataService: ProductDataService
  ) {}

  ngOnInit() {}

  get productQuantityLimitExceeds(): boolean {
    return this.productDataService.products$.value.length > this.freeProductLimit;
  }

  get hasFreePlan(): boolean {
    return localStorage.getItem("subscription_plan") === "free" ? true : false; 
  }
}
