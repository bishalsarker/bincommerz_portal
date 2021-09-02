import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_HOST } from '../../constants/api-constants';

@Injectable({
  providedIn: 'root'
})
export class StockHealthService {

  constructor(private httpClient: HttpClient) { }

  getStockHealth(): Observable<void> {
    return this.httpClient
      .get<any>(API_HOST + "products/stockhealth", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      });
  }
}
