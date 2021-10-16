import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss']
})
export class SlidersComponent implements OnInit {

  constructor(public breadCrumbService: BreadcrumbService) {}

  ngOnInit() {
    this.breadCrumbService.addBreadcrumb({
      title: "Sliders",
      route: "/widgets/sliders",
    });
  }

  ngOnDestroy(): void {
    this.breadCrumbService.removeLast();
  }
}
