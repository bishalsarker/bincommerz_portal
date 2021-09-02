import { Component, OnInit } from "@angular/core";
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { API_HOST, AUTH_HOST } from "../constants/api-constants";
import { ReportsService } from "./services/reports.service";
import { StockHealthService } from "./services/stock-health.service";

@Component({
  selector: "app-portal",
  templateUrl: "./portal.component.html",
  styleUrls: ["./portal.component.scss"],
})
export class PortalComponent {}
