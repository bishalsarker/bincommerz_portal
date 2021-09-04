import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { ITableColumn, ITableColumnAction } from "../../shared/interfaces/data-table";
import { Tag } from "../interfaces/tag";
import { TagsDataService } from "./tags-data.service";

@Injectable({
  providedIn: "root",
})
export class TagListService {
  columnConfig = new BehaviorSubject<ITableColumn[]>([
    {
      columnName: "Name",
      propertyName: "name",
    },
    {
      columnName: "Description",
      propertyName: "description",
      filter: (item: Tag) =>
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
      do: (item: Tag) => {
        this.router.navigate(["/tags/edit/" + item.id]);
      },
    },
    {
      icon: "",
      title: "Delete",
      showActions: () => true,
      predicate: (item: any) => true,
      do: (item: Tag) => {
        if(confirm("Are you sure?")) {
          this.tagsDataService.deleteTag(item.id).subscribe();
        }
      },
    },
  ]);

  constructor(
    private router: Router,
    private tagsDataService: TagsDataService
  ) {}
}
