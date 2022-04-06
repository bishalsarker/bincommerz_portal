import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ITableColumn, ITableColumnAction } from '../../shared/interfaces/data-table';
import { Coupon } from '../interfaces/coupon';
import { CouponDataService } from './coupon-data.service';

@Injectable({
  providedIn: 'root'
})
export class CouponListService {
  columnConfig = new BehaviorSubject<ITableColumn[]>([
    {
      columnName: "Code",
      propertyName: "code"
    },
    {
      columnName: "Discount",
      propertyName: "discount",
      filter: (item: Coupon) => { return item.discount + "%" }
    },
    {
      columnName: "Is Active",
      propertyName: "isActive",
      template: { type: 'bool'}
    }
  ]);

  tableActions = new BehaviorSubject<ITableColumnAction[]>([
    {
      icon: "",
      title: "Edit",
      showAction: () => true,
      predicate: (item: any) => true,
      do: (item: Coupon) => {
        this.router.navigate(["/coupons/edit/" + item.id]);
      },
    },
    {
      icon: "",
      title: "Delete",
      showAction: () => true,
      predicate: (item: any) => true,
      do: (item: Coupon) => {
        if(confirm("Are you sure?")) {
          this.couponDataService.deleteCoupon(item.id).subscribe();
        }
      },
    },
  ]);

  constructor(
    private router: Router,
    public couponDataService: CouponDataService
  ) {}
}
