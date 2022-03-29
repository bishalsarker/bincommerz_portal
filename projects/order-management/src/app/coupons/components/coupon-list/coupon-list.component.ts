import { Component, OnInit } from '@angular/core';
import { CouponDataService } from '../../services/coupon-data.service';
import { CouponListService } from '../../services/coupon-list.service';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.scss']
})
export class CouponListComponent implements OnInit {

  constructor(
    public couponDataService: CouponDataService,
    public couponListService: CouponListService) { }

  ngOnInit() {
  }

}
