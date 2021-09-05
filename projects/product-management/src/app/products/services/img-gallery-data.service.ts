import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_HOST } from 'projects/product-management/src/app/constants/api-constants';
import { GalleryImage } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ImgGalleryDataService {
  imageGalleryData$ = new BehaviorSubject<GalleryImage[]>([]);

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private router: Router) {}
  

  getAllImages(id: string): Observable<void> {
    return this.httpClient
    .get<void>(API_HOST + "products/imagegallery/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
    })
    .pipe(
      map((response: any) => {
        if (!response.isSuccess) {
          this.showError();
        } else {
          this.imageGalleryData$.next(response.data);
        }
      })
    );
  }

  uploadImage(productid: string, imageData: string): Observable<void> {
    return this.httpClient
    .post<void>(API_HOST + "products/imagegallery/add", {
      productId: productid,
      image: imageData
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
    })
    .pipe(
      map((response: any) => {
        if (!response.isSuccess) {
          this.showError();
        } else {
          this.getAllImages(productid).subscribe();
          this.toastr.success(`Image added`);
        }
      })
    );
  }

  deleteImage(productid: string, imageid: string): Observable<void> {
    return this.httpClient
      .delete<any>(API_HOST + "products/imagegallery/delete/" + productid + "/" + imageid, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (!response.isSuccess) {
            this.showError();
          } else {
            this.getAllImages(productid).subscribe();
            this.toastr.success(`Image deleted`);
          }
        })
      );
  }

  private showError(): void {
    this.toastr.error("", "Error occured");
  }
}
