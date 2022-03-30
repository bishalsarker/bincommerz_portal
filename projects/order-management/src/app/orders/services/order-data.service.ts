import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { API_HOST } from "projects/order-management/src/app/constants/api-constants";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Process } from "../../processes/interfaces/process";
import { ProcessDataService } from "../../processes/services/process-data.service";
import { Order, OrderPayment } from "../interfaces/order";

@Injectable({
  providedIn: "root",
})
export class OrderDataService {
  orders$ = new BehaviorSubject<Order[]>([]);

  selectedOrderId = new BehaviorSubject<string>(null);
  selectedOrder$ = new BehaviorSubject<Order>(null);

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private processService: ProcessDataService,
    private router: Router
  ) {
    this.selectedOrderId.subscribe((orderId) => {
      if (orderId) {
        this.getOrder(orderId).subscribe();
      }
    });
    // this.selectedOrder$.subscribe((v) => console.log(v));
  }

  updateProcess({ id }: Process): Observable<void> {
    return this.httpClient.patch<void>(
      API_HOST + "orders/updateprocess",
      {
        processId: id,
        orderId: this.selectedOrder$.value.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      }
    );
  }

  getOrders(viewType: string): Observable<void> {
    let req_url = API_HOST + "orders/get/";

    switch(viewType) {
      case "1":
        req_url += "incomplete";
        break;
      case "2":
        req_url += "completed";
        break;
      case "3":
        req_url += "canceled"
        break;
    }

    return this.httpClient
      .get<any>(req_url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            const data: Order[] = response.data.map((order) => {
              return {
                id: order.id,
                fullName: order.fullName,
                phone: order.phone,
                email: order.email,
                address: order.address,
                totalPayable: order.totalPayable,
                shippingCharge: order.shippingCharge,
                paymentMethod: order.paymentMethod,
                isCanceled: order.isCanceled,
                isCompleted: order.isCompleted,
                status: order.status,
                placedOn: this.getLocalTime(order.placedOn),
                items: order.items,
              };
            });
            this.orders$.next(data);
          } else {
            this.showError();
          }
        })
      );
  }

  getOrder(orderId: string): Observable<void> {
    return this.httpClient
      .get<any>(API_HOST + "orders/get/" + orderId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            const data: Order = {
              id: response.data.id,
              fullName: response.data.fullName,
              phone: response.data.phone,
              email: response.data.email,
              address: response.data.address,
              totalAmount: response.data.totalAmount,
              discount: response.data.discount,
              totalPayable: response.data.totalPayable,
              totalDue: response.data.totalDue,
              shippingCharge: response.data.shippingCharge,
              paymentMethod: response.data.paymentMethod,
              currentProcess: response.data.currentProcess,
              isCanceled: response.data.isCanceled,
              isCompleted: response.data.isCompleted,
              status: response.data.status,
              placedOn: this.getLocalTime(response.data.placedOn),
              items: response.data.items,
            };

            if (!data.currentProcess) {
              this.processService.currentOrder$.next(0);
            } else {
              this.processService.currentOrder$.next(
                data.currentProcess.stepNumber
              );
            }

            this.selectedOrder$.next(data);
          } else {
            this.showError();
          }
        })
      );
  }

  getTransactionLog(orderId: string): Observable<OrderPayment[]> {
    return this.httpClient
      .get<any>(API_HOST + "orders/payment/logs/" + orderId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            const logs: OrderPayment[] = response.data.map((item) => {
              const data: OrderPayment = {
                transactionMethod: item.transactionMethod,
                amount: item.amount,
                paymentNotes: item.paymentNotes,
                transactionType: item.transactionType,
                logDateTime: this.getLocalTime(item.logDateTime),
              };

              return data;
            });

            return logs;
          } else {
            this.showError();
            return null;
          }
        })
      );
  }

  cancelOrder(orderid: string): Observable<void> {
    return this.httpClient
      .patch<void>(
        API_HOST + "orders/cancelorder",
        {
          orderId: orderid,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
          },
        }
      )
      .pipe(
        map((response: any) => {
          if (response.isSuccess) {
            this.toastr.success(response.message);
          } else {
            this.showError();
          }
        })
      );
  }

  completeOrder(orderid: string): Observable<void> {
    return this.httpClient
      .patch<void>(
        API_HOST + "orders/completeorder",
        {
          orderId: orderid,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
          },
        }
      )
      .pipe(
        map((response: any) => {
          if (response.isSuccess) {
            this.toastr.success(response.message);
          } else {
            this.showError();
          }
        })
      );
  }

  deleteOrder(orderid: string): Observable<void> {
    return this.httpClient
      .delete<void>(
        API_HOST + "orders/deleteorder/" + orderid,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
          },
        }
      )
      .pipe(
        map((response: any) => {
          if (response.isSuccess) {
            this.toastr.success(response.message);
            location.reload();
          } else {
            this.showError();
          }
        })
      );
  }

  addPayment(orderPaymentPayload: OrderPayment): Observable<void> {
    return this.httpClient
      .patch<void>(API_HOST + "orders/payment/add", orderPaymentPayload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response: any) => {
          if (response.isSuccess) {
            this.toastr.success(response.message);
          } else {
            this.showError();
          }
        })
      );
  }

  deductPayment(orderPaymentPayload: OrderPayment): Observable<void> {
    return this.httpClient
      .patch<void>(API_HOST + "orders/payment/deduct", orderPaymentPayload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response: any) => {
          if (response.isSuccess) {
            this.toastr.success(response.message);
          } else {
            this.showError();
          }
        })
      );
  }

  private showError(): void {
    this.toastr.error("", "Error occured");
  }

  private getLocalTime(timeIsoString: string): Date {
    const splits: string[] = timeIsoString.split(".");
    return new Date(new Date(splits[0] + ".000Z").toString());
  }
}
