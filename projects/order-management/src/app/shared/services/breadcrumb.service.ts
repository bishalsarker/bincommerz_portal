import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IBreadcrumbItem } from "../interfaces/breadcrumb";
import { find } from "lodash";

@Injectable({
  providedIn: "root",
})
export class BreadcrumbService {
  breadcrumbs = new BehaviorSubject<IBreadcrumbItem[]>([]);

  constructor() {
    this.breadcrumbs.next([]);
  }

  public addBreadcrumb(breadcrumb: IBreadcrumbItem): void {
    if (!this.hasItem(breadcrumb)) {
      this.breadcrumbs.value.push(breadcrumb);
    }
  }

  public removeLast(): void {
    this.breadcrumbs.value.pop();
  }

  private hasItem(breadcrumb: IBreadcrumbItem): boolean {
    return find(this.breadcrumbs.value, (item: IBreadcrumbItem) => {
      return item.route === breadcrumb.route;
    });
  }
}
