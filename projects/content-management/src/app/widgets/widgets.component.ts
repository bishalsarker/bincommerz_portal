import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../shared/services/breadcrumb.service';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent implements OnInit {

  constructor(public breadCrumbService: BreadcrumbService) {}

  ngOnInit() {
    this.breadCrumbService.addBreadcrumb({
      title: "Widgets",
      route: "/widgets",
    });
  }

  ngOnDestroy(): void {
    this.breadCrumbService.removeLast();
  }

}
