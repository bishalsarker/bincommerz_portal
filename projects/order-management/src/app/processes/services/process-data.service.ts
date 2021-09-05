import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_HOST } from "projects/order-management/src/app/constants/api-constants";
import { BehaviorSubject } from "rxjs";
import { Process } from "../interfaces/process";

@Injectable({
  providedIn: "root",
})
export class ProcessDataService {
  nextProcess$ = new BehaviorSubject<Process>(null);
  currentOrder$ = new BehaviorSubject<number>(0);

  constructor(private httpClient: HttpClient) {
    this.currentOrder$.subscribe((orderNumner) => {
      this.getNextProcess(orderNumner);
    });
  }

  getNextProcess(currentOrder: number): void {
    this.httpClient
      .get<Process>(API_HOST + "processes/getnextprocess/" + currentOrder, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .subscribe((resposne: any) => {
        if (resposne.data.name) {
          this.nextProcess$.next(resposne.data);
        } else {
          this.nextProcess$.next(null);
        }
      });
  }
}
