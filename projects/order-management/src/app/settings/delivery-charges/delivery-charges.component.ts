import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';

@Component({
  selector: 'app-delivery-charges',
  templateUrl: './delivery-charges.component.html',
  styleUrls: ['./delivery-charges.component.scss']
})
export class DeliveryChargesComponent implements OnInit {

  constructor(public breadCrumbService: BreadcrumbService) {}

  ngOnInit() {
    this.breadCrumbService.addBreadcrumb({
      title: "Delivery Charges",
      route: "/settings/delivery-charges",
    });
  }

  ngOnDestroy(): void {
    this.breadCrumbService.removeLast();
  }

}
