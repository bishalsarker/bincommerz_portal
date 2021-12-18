import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ProductDataService } from "../../services/product-data.service";
import { ProductListService } from "../../services/product-list.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  freeProductLimit: number = 15;
  pageSize = new FormControl(5);
  pageNumber = new FormControl(1);

  constructor(
    public productListService: ProductListService,
    public productDataService: ProductDataService
  ) {}

  ngOnInit() {
    this.pageSize.valueChanges.subscribe((pagesize) => {
      this.productDataService.pageSize$.next(pagesize);
    });

    this.pageNumber.valueChanges.subscribe((pagenumber) => {
      this.productDataService.pageNumber$.next(pagenumber);
    });
  }

  get productQuantityLimitExceeds(): boolean {
    return this.productDataService.products$.value.length > this.freeProductLimit;
  }

  get hasFreePlan(): boolean {
    return localStorage.getItem("subscription_plan") === "free" ? true : false; 
  }
}
