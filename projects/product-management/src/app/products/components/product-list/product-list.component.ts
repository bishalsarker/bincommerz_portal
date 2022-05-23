import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { SubscriptionService } from "../../../shared/services/subscription.service";
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
  searchKeyword = new FormControl("");

  constructor(
    public productListService: ProductListService,
    public productDataService: ProductDataService,
    public subscriptionService: SubscriptionService
  ) {}

  ngOnInit() {
    this.pageSize.valueChanges.subscribe((pagesize) => {
      this.productDataService.pageSize$.next(pagesize);
    });

    this.pageNumber.valueChanges.subscribe((pagenumber) => {
      this.productDataService.pageNumber$.next(pagenumber);
    });
  }

  public clearFilters(): void {
    this.searchKeyword.setValue("");
    this.searchProduct();
  }

  public searchProduct(): void {
    this.productDataService.keyword.next(this.searchKeyword.value);
  }

  get productQuantityLimitExceeds(): boolean {
    return this.productDataService.products$.value.length > this.freeProductLimit;
  }

  get productLimit(): number {
    return this.subscriptionService.subscriptionStatus$.value.productEntryLimit;
  }

  get productsAdded(): number {
    const limit = this.subscriptionService.subscriptionStatus$.value.productEntryLimit;
    const current = this.subscriptionService.subscriptionStatus$.value.totalProducts;
    return limit - current;
  }

  get canAddProducts(): boolean {
    const current = this.subscriptionService.subscriptionStatus$.value.totalProducts;
    return this.productLimit === 0 || (this.productLimit > 0 &&  this.productLimit > current);
  }
}
