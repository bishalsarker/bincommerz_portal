import { Injectable } from '@angular/core';
import { API_HOST } from 'projects/product-management/src/app/constants/api-constants';
import { BehaviorSubject } from 'rxjs';
import { STATIC_FILES_ENDPOINT } from '../../constants/api-constants';
import { ITableColumn, ITableColumnAction } from '../../shared/interfaces/data-table';
import { GalleryImage, Product } from '../interfaces/product';
import { ImgGalleryDataService } from './img-gallery-data.service';

@Injectable({
  providedIn: 'root'
})
export class ImgGalleryListService {
  productId$ = new BehaviorSubject<string>(null);

  columnConfig$ = new BehaviorSubject<ITableColumn[]>([
    {
      columnName: "Image",
      propertyName: "image",
      template: {
        type: "image",
      },
      filter: (data: GalleryImage) =>
        this.resolveImage(data),
    },
    {
      columnName: "Is Default",
      propertyName: "isDefault",
      filter: (data: any) => data.isDefault ? "Yes" : "No",
    },
  ]);

  tableActions$ = new BehaviorSubject<ITableColumnAction[]>([
    {
      icon: "",
      title: "Delete",
      showActions: (item: GalleryImage) => item.isDefault ? false : true,
      predicate: (item: any) => true,
      do: (item: GalleryImage) => {
        if(confirm("Are you sure?")) {
          this.imgGalleryDataService.deleteImage(this.productId$.value, item.id).subscribe();
        }
      },
    },
  ]);

  constructor(
    private imgGalleryDataService: ImgGalleryDataService
  ) {}

  resolveImage(image: GalleryImage): string {
    return image && image.thumbnailImage !== ""
      ? STATIC_FILES_ENDPOINT + image.thumbnailImage
      : API_HOST + "images/default.png";
  }
}
