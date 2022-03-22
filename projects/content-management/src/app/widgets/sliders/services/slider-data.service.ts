import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_HOST, STATIC_FILES_ENDPOINT } from '../../../constants/api-constants';
import { Slide, Slider } from '../interfaces/slider';

@Injectable({
  providedIn: 'root'
})
export class SliderDataService {
  sliders$ = new BehaviorSubject<Slider[]>([]);
  slides$ = new BehaviorSubject<Slide[]>([]);

  types$: BehaviorSubject<{name: string, value: string}[]> = new BehaviorSubject([
    {
      name: "Image Slider",
      value: "image"
    },
    {
      name: "Image Banner",
      value: "banner"
    }
  ]);

  constructor(
    private httpClient: HttpClient, 
    private toastr: ToastrService,
    private router: Router)  { 
      this.getAllSliders().subscribe();
  }

  getAllSliders(): Observable<void> {
    return this.httpClient
      .get<any>(API_HOST + "widgets/sliders/get/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            this.sliders$.next(response.data as Slider[]);
          } else {
            this.showError(response.message);
          }
        })
      );
  }

  getSlider(sliderId: string): Observable<Slider> {
    return this.httpClient
      .get<any>(API_HOST + "widgets/sliders/get/slider/" + sliderId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            return response.data as Slider;
          } else {
            this.showError(response.message);
            return null;
          }
        })
      );
  }

  getSlides(sliderId: string): Observable<Slide[]> {
    return this.httpClient
      .get<any>(API_HOST + "widgets/sliders/get/slides/" + sliderId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            const slides: Slide[] = response.data as Slide[]
            slides.map((val) => val.sliderId = sliderId);
            this.slides$.next(slides);
            return response.data as Slide[];
          } else {
            this.showError(response.message);
            return [];
          }
        })
      );
  }

  getSlide(slideId: string): Observable<Slide> {
    return this.httpClient
      .get<any>(API_HOST + "widgets/sliders/get/slide/" + slideId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            const image: Slide = response.data as Slide;
            image.imageURL = STATIC_FILES_ENDPOINT + image.imageURL;
            return image;
          } else {
            this.showError(response.message);
            return null;
          }
        })
      );
  }

  addSlider(payload: Slider): Observable<boolean> {
    return this.httpClient
      .post<any>(API_HOST + "widgets/sliders/addnew", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (!response.isSuccess) {
            this.showError(response.message);
            return false;
          } else {
            this.getAllSliders().subscribe();
            this.router.navigate([`widgets/sliders`]);
            this.toastr.success(`New slider added`);
            return true;
          }
        })
      );
  }

  addSlide(payload: Slide): Observable<boolean> {
    return this.httpClient
      .post<any>(API_HOST + "widgets/sliders/slide/addnew", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (!response.isSuccess) {
            this.showError(response.message);
            return false;
          } else {
            this.getSlides(payload.sliderId).subscribe();
            this.router.navigate([`widgets/sliders/slides/list/${payload.sliderId}`]);
            this.toastr.success(`New slide added`);
            return true;
          }
        })
      );
  }

  updateSlider(payload: Slider): Observable<boolean> {
    return this.httpClient
      .put<any>(API_HOST + "widgets/sliders/update", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (!response.isSuccess) {
            this.showError(response.message);
            return false;
          } else {
            this.getAllSliders().subscribe();
            this.router.navigate([`widgets/sliders`]);
            this.toastr.success(`New slider added`);
            return true;
          }
        })
      );
  }

  updateSlide(payload: Slide): Observable<boolean> {
    return this.httpClient
      .put<any>(API_HOST + "widgets/sliders/slide/update", {
        id: payload.id,
        sliderImage: payload
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (!response.isSuccess) {
            this.showError(response.message);
            return false;
          } else {
            this.getSlides(payload.sliderId).subscribe();
            this.router.navigate([`widgets/sliders/slides/list/${payload.sliderId}`]);
            this.toastr.success(`New slide added`);
            return true;
          }
        })
      );
  }

  public deleteSlide(payload: Slide): Observable<void> {
    return this.httpClient
      .delete<any>(API_HOST + "widgets/sliders/slide/delete/" + payload.id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (!response.isSuccess) {
            this.showError(response.message);
          } else {
            this.getSlides(payload.sliderId).subscribe();
            this.router.navigate([`widgets/sliders/slides/list/${payload.sliderId}`]);
            this.toastr.success(`Slide deleted`);
          }
        })
      );
  }

  public deleteSlider(sliderId: string): Observable<void> {
    return this.httpClient
      .delete<any>(API_HOST + "widgets/sliders/delete/" + sliderId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (!response.isSuccess) {
            this.showError(response.message);
          } else {
            this.getAllSliders().subscribe();
            this.router.navigate([`widgets/sliders`]);
            this.toastr.success(`Slider deleted`);
          }
        })
      );
  }

  private showError(message: string): void {
    this.toastr.error("", "Error occured: " + message);
  }
}
