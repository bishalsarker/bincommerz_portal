import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { Router } from "@angular/router";
import { format } from "date-fns";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { TableStaticRow } from "projects/dashboard/src/app/shared/interfaces/data-table";
import { AuthService } from "projects/dashboard/src/app/shared/services/auth.service";
import { ProcessDataService } from "projects/order-management/src/app/processes/services/process-data.service";
import { Order } from "../../../interfaces/order";
import { OrderDataService } from "../../../services/order-data.service";
import { OrderItemListService } from "../../../services/order-item-list.service";

@Component({
  selector: "app-order-info",
  templateUrl: "./order-info.component.html",
  styleUrls: ["./order-info.component.scss"],
})
export class OrderInfoComponent implements OnInit, OnChanges {
  @Input() orderModel: Order;

  staticTableData: TableStaticRow[] = [];

  constructor(
    public orderDataService: OrderDataService,
    public orderItemListService: OrderItemListService,
    public processService: ProcessDataService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.staticTableData = this.getStaticTableData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.staticTableData = this.getStaticTableData();
  }

  formatDate(date: Date): string {
    return format(date, "MMM dd yyyy, hh:mm aaa");
  }

  formatIsPaid(isPaid): string {
    return isPaid ? "Yes" : "No";
  }

  formatDeliveryMethod(deliverMethod): string {
    if (this.orderModel) {
      if (deliverMethod === "cod") {
        return "Cash On Delivery";
      }

      if (deliverMethod === "online") {
        return "Online Payment";
      }
    }

    return "Invalid Payment Method";
  }

  cancelOrder(): void {
    if(confirm("Are you sure you want to cancel this order? This action cannot be undone")) {
      this.orderDataService
      .cancelOrder(this.orderModel.id)
      .subscribe(() =>
        this.orderDataService.selectedOrderId.next(this.orderModel.id)
      );
    }
  }

  completeOrder(): void {
    if(confirm("Are you sure you want to complete this order? This action cannot be undone")) {
      this.orderDataService
      .completeOrder(this.orderModel.id)
      .subscribe(() =>
        this.orderDataService.selectedOrderId.next(this.orderModel.id)
      );
    }
  }

  deleteOrder(): void {
    if(confirm("Are you sure you want to delete this order? This action cannot be undone")) {
      this.orderDataService
      .deleteOrder(this.orderModel.id)
      .subscribe(() =>{
        window.location.href = '/orders'
      });
    }
  }

  private getStaticTableData(): TableStaticRow[] {
    return [
      {
        cells: [
          {
            data: "Shipping Charge",
            style: { "font-weight": "bold" },
            colSpan: 3,
          },
          {
            data: `${
              this.orderModel ? this.orderModel.shippingCharge.toString() : "0"
            } Tk`,
            colSpan: 0,
          },
        ],
      },
      {
        cells: [
          {
            data: "Total Payable",
            style: { "font-weight": "bold", color: "#28a745" },
            colSpan: 3,
          },
          {
            data: `${
              this.orderModel ? this.orderModel.totalPayable.toString() : "0"
            } Tk`,
            style: { "font-weight": "bold", color: "#28a745" },
            colSpan: 0,
          },
        ],
      },
      {
        cells: [
          {
            data: "Total Due",
            style: { "font-weight": "bold", color: "red" },
            colSpan: 3,
          },
          {
            data: `${
              this.orderModel ? this.orderModel.totalDue.toString() : "0"
            } Tk`,
            style: { "font-weight": "bold", color: "red" },
            colSpan: 0,
          },
        ],
      },
      {
        cells: [
          {
            data: "Total Paid",
            style: { "font-weight": "bold", color: "blue" },
            colSpan: 3,
          },
          {
            data: `${
              this.orderModel
                ? (
                    this.orderModel.totalPayable - this.orderModel.totalDue
                  ).toString()
                : "0"
            } Tk`,
            style: { "font-weight": "bold", color: "blue" },
            colSpan: 0,
          },
        ],
      },
      {
        cells: [
          {
            data: "Payment Method",
            style: { "font-weight": "bold" },
            colSpan: 3,
          },
          {
            data: this.orderModel
              ? this.formatDeliveryMethod(this.orderModel.paymentMethod)
              : "N/A",
            style: { "font-weight": "bold" },
            colSpan: 0,
          },
        ],
      },
      {
        cells: [
          {
            data: "Payment Notes",
            style: { "font-weight": "bold" },
            colSpan: 3,
          },
          {
            data:
              this.orderModel &&
              this.orderModel.paymentNotes &&
              this.orderModel.paymentNotes.trim() !== ""
                ? this.orderModel.paymentNotes
                : "N/A",
            style: { "font-weight": "bold" },
            colSpan: 0,
          },
        ],
      },
    ];
  }
}
