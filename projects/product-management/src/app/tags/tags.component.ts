import { Component, OnInit } from "@angular/core";
import { BreadcrumbService } from "../shared/services/breadcrumb.service";

@Component({
  selector: "app-tags",
  templateUrl: "./tags.component.html",
  styleUrls: ["./tags.component.scss"],
})
export class TagsComponent implements OnInit {
  constructor(public breadCrumbService: BreadcrumbService) {}

  ngOnInit() {
    this.breadCrumbService.addBreadcrumb({
      title: "Tags",
      route: "/tags",
    });
  }

  ngOnDestroy(): void {
    this.breadCrumbService.removeLast();
  }
}
