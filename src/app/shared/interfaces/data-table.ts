export interface ITableColumn {
  columnName: string;
  propertyName: string;
  template?: { type: string; config?: any };
  filter?(item: any): any;
}

export interface ITableColumnAction {
  icon: string;
  title: string;
  isDisabled?: boolean;
  predicate(item: any): boolean;
  do(item: any): void;
}

export interface TableStaticRow {
  cells: TableStaticRowData[];
}

export interface TableStaticRowData {
  data: string;
  style?: any;
  colSpan: number;
  // span: boolean;
}
