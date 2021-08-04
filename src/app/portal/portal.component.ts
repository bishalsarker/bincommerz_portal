import { Component, OnInit } from "@angular/core";
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { API_HOST, AUTH_HOST } from "../constants/api-constants";
import { ReportsService } from "./services/reports.service";

@Component({
  selector: "app-portal",
  templateUrl: "./portal.component.html",
  styleUrls: ["./portal.component.scss"],
})
export class PortalComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{ ticks : {
      callback: function(value) {
        return value.toString().substring(0, 5) + '...';
      }
    }}] }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = false;

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Products' },
  ];

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left'
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  //summary
  public totalOrder: number = 0;
  public totalCompletedOrder: number = 0;
  public totalInprogressOrder: number = 0;
  public totalCanceledOrder: number = 0;

  //Month Names
  public monthNames: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  public currentMonthIndex: number = 0;
  
  constructor(private reportservice: ReportsService) {}

  ngOnInit() {
    const d = new Date();
    this.currentMonthIndex = d.getMonth();

    this.reportservice.getOrderSummary().subscribe((response: any) => {
      this.totalOrder = response.data.totalOrder;
      this.totalCompletedOrder = response.data.totalCompletedOrder;
      this.totalInprogressOrder = response.data.totalIncompleteOrder;
      this.totalCanceledOrder = response.data.totalCanceledOrder;
    });

    this.reportservice.getMostOrderedProducts(this.currentMonthIndex, d.getFullYear()).subscribe((response: any) => {
      this.barChartLabels = [];
      this.barChartData[0].data = [];

      response.data.orderCounts.forEach((item) => {
        this.barChartLabels.push(item.productName);
        this.barChartData[0].data.push(item.orderCount);
      });
    });

    this.reportservice.getMostPopularTags(this.currentMonthIndex, d.getFullYear()).subscribe((response: any) => {
      response.data.forEach((item) => {
        this.pieChartLabels.push(item.tagName);
        this.pieChartData.push(item.percentage);
      });
    });
  }

  get currentMonth(): string {
    return this.monthNames[this.currentMonthIndex];
  }

  get showSummary(): boolean {
    return this.totalOrder + this.totalCompletedOrder + this.totalInprogressOrder + this.totalCanceledOrder !== 0;
  }

  get orderManagementUrl(): string {
    return API_HOST + "retail-admin/order-management/";
  }

  get productManagementUrl(): string {
    return API_HOST + "retail-admin/product-management/";
  }
}
