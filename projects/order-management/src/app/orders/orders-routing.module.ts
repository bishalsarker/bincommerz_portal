import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OrderDetailsComponent } from "./components/order-details/order-details.component";
import { OrderPaymentFormComponent } from "./components/order-details/order-payment-form/order-payment-form.component";
import { TransactionLogsComponent } from "./components/order-details/transaction-logs/transaction-logs.component";
import { OrderListContainerComponent } from "./components/order-list-container/order-list-container.component";
import { OrdersComponent } from "./orders.component";

const routes: Routes = [
  {
    path: "",
    component: OrdersComponent,
    children: [
      {
        path: "",
        component: OrderListContainerComponent,
      },
      {
        path: "details/:id",
        component: OrderDetailsComponent,
      },
      {
        path: "update-payment/:orderid",
        component: OrderPaymentFormComponent,
      },
      {
        path: "transactions/:orderid",
        component: TransactionLogsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
