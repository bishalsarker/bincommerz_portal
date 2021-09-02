import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ITableColumn } from "../../shared/interfaces/data-table";
import { formatDate } from "../../utils/datetime.util";
import { OrderPayment } from "../interfaces/order";

@Injectable({
  providedIn: "root",
})
export class TransactionLogService {
  columnConfig$ = new BehaviorSubject<ITableColumn[]>([
    {
      columnName: "Logged On",
      propertyName: "logDateTime",
      filter: (item: OrderPayment) => formatDate(item.logDateTime),
    },
    {
      columnName: "Amount",
      propertyName: "amount",
      filter: (item: OrderPayment) =>
        item.transactionType === "add"
          ? `+ ${item.amount} Tk`
          : `- ${item.amount} Tk`,
    },
    {
      columnName: "Transaction Method",
      propertyName: "transactionMethod",
    },
    {
      columnName: "Payment Notes",
      propertyName: "paymentNotes",
      filter: (item: OrderPayment) =>
        item.paymentNotes && item.paymentNotes.trim()
          ? item.paymentNotes
          : "N/A",
    },
  ]);
}
