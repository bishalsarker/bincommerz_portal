import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrdersRoutingModule } from "./orders-routing.module";
import { OrdersComponent } from "./orders.component";
import { OrderListContainerComponent } from "./components/order-list-container/order-list-container.component";
import { ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { SharedModule } from "../shared/shared.module";
import { OrderDetailsComponent } from "./components/order-details/order-details.component";
import { OrderInfoComponent } from "./components/order-details/order-info/order-info.component";
import { OrderPaymentFormComponent } from "./components/order-details/order-payment-form/order-payment-form.component";
import { BtnProcessComponent } from "./components/order-details/btn-process/btn-process.component";
import { TransactionLogsComponent } from "./components/order-details/transaction-logs/transaction-logs.component";

@NgModule({
  declarations: [
    OrdersComponent,
    OrderListContainerComponent,
    OrderDetailsComponent,
    OrderInfoComponent,
    OrderPaymentFormComponent,
    BtnProcessComponent,
    TransactionLogsComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule,
  ],
})
export class OrdersModule {}
