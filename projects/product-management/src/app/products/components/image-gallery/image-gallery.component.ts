import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { BreadcrumbService } from '../../../shared/services/breadcrumb.service';
import { ImgGalleryDataService } from '../../services/img-gallery-data.service';
import { ImgGalleryListService } from '../../services/img-gallery-list.service';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {
  productId = new BehaviorSubject<string>(null);
  imageControl = new FormControl(null);
  enableButton: boolean = false;
  imageData: string = null;
  uploadBtnText: string = "Upoad Image";

  @ViewChild('fileinput', { static: true }) fileinput: ElementRef;

  constructor(
    public breadCrumbService: BreadcrumbService,
    public imgGalleryListService: ImgGalleryListService,
    public imgGalleryDataService: ImgGalleryDataService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.breadCrumbService.addBreadcrumb({
      title: "Image Gallery",
      route: "",
    });

    this.route.params.subscribe((param: ParamMap) => {
      const productid: string = param["id"];
      this.productId.next(productid);

      this.imgGalleryListService.productId$.next(productid);

      this.breadCrumbService.addBreadcrumb({
        title: productid,
        route: "/products/edit/" + productid,
      });

      this.imgGalleryDataService.getAllImages(productid).subscribe();
    });
  }

  upload(): void {
    this.enableButton = false;
    this.uploadBtnText = "Uploading...";
    this.imgGalleryDataService.uploadImage(this.productId.value, this.imageControl.value)
    .subscribe(() => {
      this.imageControl.setValue("");
      this.imageData = "";
      this.fileinput.nativeElement.value = "";
    }, () => {}, () => {
      this.enableButton = true;
      this.uploadBtnText = "Upoad Image";
    });
  }

  handleFileInput(file: File): void {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      const imageData: string = reader.result as string;
      if(imageData && imageData !== "") {
        this.imageData = imageData;
        this.imageControl.setValue(imageData.split(",")[1]);
        this.enableButton = true;
      } else {
        this.enableButton = false;
      }
    };
  }

}
