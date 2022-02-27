import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { Router } from "@angular/router";
import { format } from "date-fns";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { environment } from "projects/order-management/src/environments/environment";
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

  shop_logo: string = "./assets/images/bincom-logo-black.png";

  constructor(
    public orderDataService: OrderDataService,
    public orderItemListService: OrderItemListService,
    public processService: ProcessDataService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // if (environment.production) {
    //   this.authService.getShopInfoObservable().subscribe((shopinfo) => {
    //     this.shop_logo = 'https://bincommerzstaticstorage.blob.core.windows.net' + shopinfo.logo;
    //   });
    // }

    if (localStorage.getItem('user_name') === 'Bdgadgethouse') {
      this.shop_logo = "./assets/images/bd-gadget-house.png";
    }

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

  downloadInvoice(): void {
    let PDF = new jsPDF('p', 'mm', 'a4');
    var shopLogo = new Image();
    shopLogo.src = this.shop_logo;
    // PDF.addImage(this.shop_logo, 'png', 10, 5, 40, 0);
    PDF.setFont("courier", null, 800);
    PDF.setFontSize(15);
    PDF.text(`BD Gadget House`, 10, 15);
    PDF.setFontSize(11);
    PDF.text(`Number: 01771734092`, 10, 20);
    PDF.text(`Email : bdgadgethouse24@gmail.com`, 10, 25);

    PDF.setLineWidth(0.20); 
    PDF.line(0, 35, 560, 35);
    PDF.setFontSize(10);
    PDF.text(`Invoice ID: ${this.orderModel.id}`, 16, 45);
    PDF.text(`Date: ${format(new Date(), "MMM dd, yyyy")}`, 166, 45);

    let head = [], data = [];

    this.orderItemListService.columnConfig$.value.forEach((col) => {
      head.push(col.columnName);
    });

    this.orderModel.items.forEach((item) => {
      const row = [];
      row.push(item.name);
      row.push(item.price + ' Tk');
      row.push(item.quantity);
      row.push('-' + item.discountAmount + ' Tk');
      row.push(item.subtotal + ' Tk');
      data.push(row);
    });

    data.push(["", "", "", "Shipping Charge", `${this.orderModel.shippingCharge + 0.00} Tk`]);
    data.push(["", "", "", "Total Payable", `${this.orderModel.totalPayable + 0.00} Tk`]);
    data.push(["", "", "", "Total Paid", `${(this.orderModel.totalPayable - this.orderModel.totalDue) + 0.00} Tk`]);
    data.push(["", "", "", "Total Due", `${this.orderModel.totalDue + 0.00} Tk` ]);

    let bill_col = ["Bill To", "Shipping Address"];
    let bill_data = [
      [this.orderModel.fullName, this.orderModel.fullName],
      ['+880' + this.orderModel.phone, '+880' + this.orderModel.phone],
      [this.orderModel.email, this.orderModel.address]
    ];

    (PDF as any).autoTable({
      head: [bill_col],
      body: bill_data,
      theme: 'plain',
      startX: 50,
      startY: 55
    });

    let finalY = (PDF as any).lastAutoTable.finalY;

    (PDF as any).autoTable({
      head: [head],
      body: data,
      theme: 'striped',
      startX: 50,
      startY: finalY + 10
    });

    PDF.save(`invoice_${this.orderModel.id}.pdf`);
  }

  private getStaticTableData(): TableStaticRow[] {
    return [
      {
        cells: [
          {
            data: "Shipping Charge",
            style: { "font-weight": "bold" },
            colSpan: 4,
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
            colSpan: 4,
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
            colSpan: 4,
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
            colSpan: 4,
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
            colSpan: 4,
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
            colSpan: 4,
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
