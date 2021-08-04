import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_HOST } from 'src/app/constants/api-constants';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private httpClient: HttpClient) { }

  getOrderSummary(): Observable<void> {
    return this.httpClient
      .get<any>(API_HOST + "reports/ordersummary", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      });
  }

  getMostOrderedProducts(month: number, year: number): Observable<void> {
    return this.httpClient
      .get<any>(API_HOST + "reports/mostorderedproducts", {
        params: {
          month: month.toString(),
          year: year.toString()
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      });
  }

  getMostPopularTags(month: number, year: number): Observable<void> {
    return this.httpClient
      .get<any>(API_HOST + "reports/mostpopulartags", {
        params: {
          month: month.toString(),
          year: year.toString()
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      });
  }
}
