import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { BreadcrumbService } from "projects/dashboard/src/app/shared/services/breadcrumb.service";
import { OrderPayment } from "../../../interfaces/order";
import { OrderDataService } from "../../../services/order-data.service";

@Component({
  selector: "app-order-payment-form",
  templateUrl: "./order-payment-form.component.html",
  styleUrls: ["./order-payment-form.component.scss"],
})
export class OrderPaymentFormComponent implements OnInit, OnDestroy {
  orderId: string = null;
  totalPayable: string = "0.00";
  totalDue: string = "0.00";

  paymentForm = new FormGroup({
    ammountControl: new FormControl(0, Validators.required),
    transactionMethodControl: new FormControl("cash", Validators.required),
    paymentNotesControl: new FormControl(""),
  });

  constructor(
    private breadCrumbService: BreadcrumbService,
    private route: ActivatedRoute,
    public orderService: OrderDataService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.orderId = params.get("orderid");
      this.orderService.selectedOrderId.next(this.orderId);
    });

    this.breadCrumbService.addBreadcrumb({
      title: "Update Payment",
      route: "",
    });
  }

  ngOnDestroy(): void {
    this.breadCrumbService.removeLast();
  }

  addAmount(): void {
    this.orderService.addPayment(this.getPaymentPayload()).subscribe(() => {
      this.orderService.selectedOrderId.next(this.orderId);
      this.resetFormData();
    });
  }

  deductAmount(): void {
    this.orderService.deductPayment(this.getPaymentPayload()).subscribe(() => {
      this.orderService.selectedOrderId.next(this.orderId);
      this.resetFormData();
    });
  }

  get ammountControl(): AbstractControl {
    return this.paymentForm.get("ammountControl");
  }

  get transactionMethodControl(): AbstractControl {
    return this.paymentForm.get("transactionMethodControl");
  }

  get paymentNotesControl(): AbstractControl {
    return this.paymentForm.get("paymentNotesControl");
  }

  private getPaymentPayload(): OrderPayment {
    return {
      orderId: this.orderId,
      transactionMethod: this.transactionMethodControl.value,
      amount: this.ammountControl.value,
      paymentNotes: this.paymentNotesControl.value,
    };
  }

  private resetFormData(): void {
    this.ammountControl.setValue(0);
    this.transactionMethodControl.setValue("");
    this.paymentNotesControl.setValue("");
  }
}
