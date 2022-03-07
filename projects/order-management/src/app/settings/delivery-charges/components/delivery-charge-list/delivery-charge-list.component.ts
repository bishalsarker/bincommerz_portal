import { Component, OnInit } from '@angular/core';
import { DeliveryChargeDataService } from '../../services/delivery-charge-data.service';
import { DeliveryChargeListService } from '../../services/delivery-charge-list.service';

@Component({
  selector: 'app-delivery-charge-list',
  templateUrl: './delivery-charge-list.component.html',
  styleUrls: ['./delivery-charge-list.component.scss']
})
export class DeliveryChargeListComponent implements OnInit {

  constructor(
    public deliveryChargeListService: DeliveryChargeListService,
    public deliveryChargeDataService: DeliveryChargeDataService
  ) {}

  ngOnInit() {
    // this.templatesDataService.templates$.subscribe((v) => console.log(v))
  }

}
