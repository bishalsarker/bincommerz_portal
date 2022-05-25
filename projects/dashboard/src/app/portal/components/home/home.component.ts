import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { environment } from 'projects/dashboard/src/environments/environment';
import { API_HOST } from '../../../constants/api-constants';
import { AuthService } from '../../../shared/services/auth.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { SubscriptionService } from '../../../shared/services/subscription.service';
import { ReportsService } from '../../services/reports.service';
import { StockHealthService } from '../../services/stock-health.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public stockHealthData: any = null;

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

  private readonly portalUrl: string = environment.portal_url;
  
  constructor(
    private reportservice: ReportsService, 
    private stockHealthService: StockHealthService,
    public subscriptionService: SubscriptionService,
    private loaderService: LoaderService) {}

  ngOnInit() {
    this.loaderService.isLoading.next(true);

    const d = new Date();
    this.currentMonthIndex = d.getMonth();

    this.reportservice.getOrderSummary().subscribe((response: any) => {
      this.totalOrder = response.data.totalOrder;
      this.totalCompletedOrder = response.data.totalCompletedOrder;
      this.totalInprogressOrder = response.data.totalIncompleteOrder;
      this.totalCanceledOrder = response.data.totalCanceledOrder;
    });

    this.reportservice.getMostOrderedProducts(this.currentMonthIndex + 1, d.getFullYear()).subscribe((response: any) => {
      this.barChartLabels = [];
      this.barChartData[0].data = [];

      response.data.orderCounts.forEach((item) => {
        this.barChartLabels.push(item.productName);
        this.barChartData[0].data.push(item.orderCount);
      });
    });

    this.reportservice.getMostPopularTags(this.currentMonthIndex + 1, d.getFullYear()).subscribe((response: any) => {
      response.data.forEach((item) => {
        this.pieChartLabels.push(item.tagName);
        this.pieChartData.push(item.percentage);
      });
    });

    this.stockHealthService.getStockHealth().subscribe((response: any) => {
      this.stockHealthData = response.data;
    }, () => {}, () => this.loaderService.isLoading.next(false));
  }

  get currentMonth(): string {
    return this.monthNames[this.currentMonthIndex];
  }

  get showSummary(): boolean {
    return this.totalOrder + this.totalCompletedOrder + this.totalInprogressOrder + this.totalCanceledOrder !== 0;
  }

  get orderManagementUrl(): string {
    return this.portalUrl + "order-management/";
  }

  get productManagementUrl(): string {
    return this.portalUrl + "product-management/";
  }

  get contentManagementUrl(): string {
    return this.portalUrl + "content-management/";
  }

  get hasFreePlan(): boolean {
    return localStorage.getItem("subscription_plan") === "free" ? true : false; 
  }

}
