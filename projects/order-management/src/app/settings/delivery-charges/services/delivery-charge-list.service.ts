import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ITableColumn, ITableColumnAction } from '../../../shared/interfaces/data-table';
import { DeliveryCharge } from '../interfaces/delivery-charge';
import { DeliveryChargeDataService } from './delivery-charge-data.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryChargeListService {

  columnConfig = new BehaviorSubject<ITableColumn[]>([
    {
      columnName: "Title",
      propertyName: "title"
    },
    {
      columnName: "Amount",
      propertyName: "amount",
      filter: (item: DeliveryCharge) => { return item.amount + " Tk" }
    }
  ]);

  tableActions = new BehaviorSubject<ITableColumnAction[]>([
    {
      icon: "",
      title: "Edit",
      showAction: () => true,
      predicate: (item: any) => true,
      do: (item: DeliveryCharge) => {
        this.router.navigate(["/templates/edit/" + item.id]);
      },
    },
    {
      icon: "",
      title: "Delete",
      showAction: () => true,
      predicate: (item: any) => true,
      do: (item: DeliveryCharge) => {
        if(confirm("Are you sure?")) {
          // this.templatesDataService.deleteTemplate(item.id).subscribe();
        }
      },
    },
  ]);

  constructor(
    private router: Router,
    public templatesDataService: DeliveryChargeDataService
  ) {}
}
