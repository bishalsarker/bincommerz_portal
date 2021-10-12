import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ITableColumn, ITableColumnAction } from '../../../shared/interfaces/data-table';
import { Slider } from '../interfaces/slider';
import { SliderDataService } from './slider-data.service';

@Injectable({
  providedIn: 'root'
})
export class SliderListService {
  columnConfig = new BehaviorSubject<ITableColumn[]>([
    {
      columnName: "Name",
      propertyName: "name",
      template: {
        type: "link",
        config: {
          href: "slides/list/:id"
        }
      }
    },
    {
      columnName: "Type",
      propertyName: "type",
    },
  ]);

  tableActions = new BehaviorSubject<ITableColumnAction[]>([
    {
      icon: "",
      title: "Edit",
      showActions: () => true,
      predicate: (item: any) => true,
      do: (item: Slider) => {
        this.router.navigate(["widgets/sliders/edit/" + item.id]);
      },
    },
    {
      icon: "",
      title: "Delete",
      showActions: () => true,
      predicate: (item: any) => true,
      do: (item: Slider) => {
        if(confirm("Are you sure?")) {
          this.sliderDataService.deletePage(item.id).subscribe();
        }
      },
    },
  ]);

  constructor(
    private router: Router,
    public sliderDataService: SliderDataService
  ) { }
}
