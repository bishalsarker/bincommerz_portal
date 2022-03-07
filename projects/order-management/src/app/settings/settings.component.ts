import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../shared/services/breadcrumb.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(public breadCrumbService: BreadcrumbService) {}

  ngOnInit() {
    this.breadCrumbService.addBreadcrumb({
      title: "Settings",
      route: "/orders/settings",
    });
  }

  ngOnDestroy(): void {
    this.breadCrumbService.removeLast();
  }

}
