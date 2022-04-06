import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../shared/services/breadcrumb.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {
  constructor(public breadCrumbService: BreadcrumbService) {}

  ngOnInit() {
    this.breadCrumbService.addBreadcrumb({
      title: "Coupons",
      route: "/coupons",
    });
  }

  ngOnDestroy(): void {
    this.breadCrumbService.removeLast();
  }

}
