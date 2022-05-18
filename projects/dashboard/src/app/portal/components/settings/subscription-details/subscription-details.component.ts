import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { SubscriptionService } from 'projects/dashboard/src/app/shared/services/subscription.service';

@Component({
  selector: 'app-subscription-details',
  templateUrl: './subscription-details.component.html',
  styleUrls: ['./subscription-details.component.scss']
})
export class SubscriptionDetailsComponent implements OnInit {

  constructor(public subscriptionService: SubscriptionService) { }

  ngOnInit() {
  }

  getStatus(isActive: boolean): string {
    return isActive ? "ACTIVE" : "NOT ACTIVE"
  }

  formatDate(date: string): string {
    return format(new Date(date), "MMM dd yyyy, hh:mm aaa");
  }

}
