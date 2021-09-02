import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { OrderDataService } from "../../services/order-data.service";
import { OrderListService } from "../../services/order-list.service";

@Component({
  selector: "app-order-list-container",
  templateUrl: "./order-list-container.component.html",
  styleUrls: ["./order-list-container.component.scss"],
})
export class OrderListContainerComponent implements OnInit {
  listViewControl = new FormControl("1");

  constructor(
    public orderListService: OrderListService,
    public orderDataService: OrderDataService
  ) {}

  ngOnInit() {
    this.orderDataService.getOrders(this.listViewControl.value).subscribe();

    this.listViewControl.valueChanges.subscribe((val) => {
      this.orderDataService.getOrders(val).subscribe();
    })
  }

  get isEmptyList(): boolean {
    return this.orderDataService.orders$.value.length === 0;
  }
}
