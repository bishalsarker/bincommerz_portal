import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ITableColumn, ITableColumnAction } from 'projects/content-management/src/app/shared/interfaces/data-table';
import { STATIC_FILES_ENDPOINT } from 'projects/content-management/src/app/constants/api-constants';
import { BehaviorSubject } from 'rxjs';
import { Slide } from '../interfaces/slider';
import { SliderDataService } from './slider-data.service';

@Injectable({
  providedIn: 'root'
})
export class SlideListService {
  columnConfig = new BehaviorSubject<ITableColumn[]>([
    {
      columnName: "Image",
      propertyName: "imageURL",
      filter: (slide: Slide) => STATIC_FILES_ENDPOINT + slide.imageURL,
      template: {
        type: "image"
      }
    }
  ]);

  tableActions = new BehaviorSubject<ITableColumnAction[]>([
    {
      icon: "",
      title: "Edit",
      showActions: () => true,
      predicate: (item: any) => true,
      do: (item: Slide) => {
        this.router.navigate([`widgets/sliders/slides/edit/${item.sliderId}/${item.id}`]);
      },
    },
    {
      icon: "",
      title: "Delete",
      showActions: () => true,
      predicate: (item: any) => true,
      do: (item: Slide) => {
        if(confirm("Are you sure?")) {
          this.sliderDataService.deleteSlide(item).subscribe();
        }
      },
    },
  ]);

  constructor(
    private router: Router,
    public sliderDataService: SliderDataService
  ) { }
}
