import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../shared/services/breadcrumb.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  constructor(public breadCrumbService: BreadcrumbService) {}

  ngOnInit() {
    this.breadCrumbService.addBreadcrumb({
      title: "Templates",
      route: "/templates",
    });
  }

  ngOnDestroy(): void {
    this.breadCrumbService.removeLast();
  }

}
