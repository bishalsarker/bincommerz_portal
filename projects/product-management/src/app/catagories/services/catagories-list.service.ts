import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ITableColumn, ITableColumnAction } from '../../shared/interfaces/data-table';
import { Catagory } from '../interfaces/catagory';
import { CatagoriesDataService } from './catagories-data.service';

@Injectable({
  providedIn: 'root'
})
export class CatagoriesListService {
  columnConfig = new BehaviorSubject<ITableColumn[]>([
    {
      columnName: "Name",
      propertyName: "name",
      template: {
        type: "link",
        config: {
          href: "/categories/edit/:id",
        },
      },
    },
    {
      columnName: "Assiciated Tag",
      propertyName: "tagName",
    },
    {
      columnName: "Slug",
      propertyName: "slug",
      filter: (item: Catagory) => "/" + item.slug,
    },
    {
      columnName: "Description",
      propertyName: "description",
      filter: (item: Catagory) =>
        item.description && item.description.trim() !== ""
          ? item.description
          : "n/a",
    },
  ]);

  subColumnConfig = new BehaviorSubject<ITableColumn[]>([
    {
      columnName: "Name",
      propertyName: "name",
    },
    {
      columnName: "Assiciated Tag",
      propertyName: "tagName",
    },
    {
      columnName: "Slug",
      propertyName: "slug",
      filter: (item: Catagory) => "/" + item.slug,
    },
    {
      columnName: "Description",
      propertyName: "description",
      filter: (item: Catagory) =>
        item.description && item.description.trim() !== ""
          ? item.description
          : "n/a",
    },
  ]);

  tableActions = new BehaviorSubject<ITableColumnAction[]>([
    {
      icon: "",
      title: "Edit",
      showActions: () => true,
      predicate: (item: any) => true,
      do: (item: Catagory) => {
        this.router.navigate(["/categories/edit/" + item.id]);
      },
    },
    {
      icon: "",
      title: "Delete",
      showActions: () => true,
      predicate: (item: any) => true,
      do: (item: Catagory) => {
        if(confirm("Are you sure?")) {
          this.categoryDataService.deleteCategory(item.id).subscribe();
        }
      },
    },
    {
      icon: "",
      title: "Manage Subcategories",
      showActions: () => true,
      predicate: (item: any) => true,
      do: (item: Catagory) => {
        this.router.navigate(["/categories/subcategories/" + item.id]);
      },
    },
  ]);

  subCatTableActions = new BehaviorSubject<ITableColumnAction[]>([
    {
      icon: "",
      title: "Edit",
      showActions: () => true,
      predicate: (item: any) => true,
      do: (item: Catagory) => {
        this.router.navigate(["/categories/subcategories/edit/" + item.id + "/" + item.parentCategoryId]);
      },
    },
    {
      icon: "",
      title: "Delete",
      showActions: () => true,
      predicate: (item: any) => true,
      do: (item: Catagory) => {
        if(confirm("Are you sure?")) {
          this.categoryDataService.deleteCategory(item.id).subscribe();
        }
      },
    }
  ]);

  constructor(
    private router: Router,
    public categoryDataService: CatagoriesDataService
  ) {}
}
