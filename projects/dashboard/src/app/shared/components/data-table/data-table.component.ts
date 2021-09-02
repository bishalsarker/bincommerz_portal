import { Component, Input, OnInit } from "@angular/core";
import {
  ITableColumn,
  ITableColumnAction,
  TableStaticRowData,
} from "../../../shared/interfaces/data-table";
import { filter } from "lodash";

@Component({
  selector: "app-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.scss"],
})
export class DataTableComponent implements OnInit {
  @Input() public columnConfig: ITableColumn[] = [];
  @Input() public actions: ITableColumnAction[] = [];
  @Input() public tableData: any[] = [];
  @Input() public staticData: TableStaticRowData[] = [];

  constructor() {}

  ngOnInit() {}

  public getValue(column: ITableColumn, item: any): any {
    if (column.filter) {
      return column.filter(item);
    } else {
      return item[column.propertyName];
    }
  }

  public getActions(item: any): ITableColumnAction[] {
    return filter(this.actions, (action: ITableColumnAction) => {
      return action.predicate(item);
    });
  }

  public getHyperlink(href: string, dataObject: any): string {
    const splits: string[] = href.split("/");
    const mappedData: string[] = splits.map((item: string) => {
      if (item.includes(":")) {
        const propName: string = item.replace(":", "").trim();
        return dataObject[propName];
      }

      return item;
    });

    return mappedData.join("/");
  }
}
