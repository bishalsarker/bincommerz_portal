import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ITableColumn, ITableColumnAction } from '../../shared/interfaces/data-table';
import { Template } from '../interfaces/template';
import { TemplateDataService } from './template-data.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateListService {
  columnConfig = new BehaviorSubject<ITableColumn[]>([
    {
      columnName: "Name",
      propertyName: "name",
    },
    {
      columnName: "Is Default",
      propertyName: "isDefault",
      template: { type: 'bool'}
    }
  ]);

  tableActions = new BehaviorSubject<ITableColumnAction[]>([
    {
      icon: "",
      title: "Edit",
      showActions: () => true,
      predicate: (item: any) => true,
      do: (item: Template) => {
        this.router.navigate(["/templates/edit/" + item.id]);
      },
    },
    {
      icon: "",
      title: "Delete",
      showActions: () => true,
      predicate: (item: any) => true,
      do: (item: Template) => {
        if(confirm("Are you sure?")) {
          this.templatesDataService.deleteTemplate(item.id).subscribe();
        }
      },
    },
  ]);

  constructor(
    private router: Router,
    public templatesDataService: TemplateDataService
  ) {}
}
