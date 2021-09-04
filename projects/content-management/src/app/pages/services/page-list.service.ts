import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ITableColumn, ITableColumnAction } from '../../shared/interfaces/data-table';
import { Page } from '../interfaces/Page';
import { PagesDataService } from './pages-data.service';

@Injectable({
  providedIn: 'root'
})
export class PageListService {

  columnConfig = new BehaviorSubject<ITableColumn[]>([
    {
      columnName: "Title",
      propertyName: "pageTitle",
    },
    {
      columnName: "Category",
      propertyName: "category",
    },
    {
      columnName: "Is Published",
      propertyName: "isPublished",
      template: { type: 'bool'}
    },
  ]);

  tableActions = new BehaviorSubject<ITableColumnAction[]>([
    {
      icon: "",
      title: "Edit",
      showActions: () => true,
      predicate: (item: any) => true,
      do: (item: Page) => {
        this.router.navigate(["/pages/edit/" + item.id]);
      },
    },
    {
      icon: "",
      title: "Delete",
      showActions: () => true,
      predicate: (item: any) => true,
      do: (item: Page) => {
        if(confirm("Are you sure?")) {
          this.pagesDataService.deletePage(item.id).subscribe();
        }
      },
    },
  ]);

  constructor(
    private router: Router,
    public pagesDataService: PagesDataService
  ) {}
}
