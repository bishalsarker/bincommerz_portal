import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_HOST } from '../../../constants/api-constants';
import { Slide, Slider } from '../interfaces/slider';

@Injectable({
  providedIn: 'root'
})
export class SliderDataService {
  sliders$ = new BehaviorSubject<Slider[]>([]);
  types$: BehaviorSubject<{name: string, value: string}[]> = new BehaviorSubject([
    {
      name: "Image",
      value: "image"
    },
    {
      name: "Card",
      value: "card"
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
      .get<any>(API_HOST + "widgets/sliders/getbyid/" + sliderId, {
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
            return response.data as Slide[];
          } else {
            this.showError(response.message);
            return [];
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
            this.router.navigate(["pages"]);
            this.toastr.success(`New page added`);
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
            this.router.navigate(["pages"]);
            this.toastr.success(`Page updated`);
            return true;
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
            this.router.navigate(["categories"]);
            this.toastr.success(`Category deleted`);
          }
        })
      );
  }

  private showError(message: string): void {
    this.toastr.error("", "Error occured: " + message);
  }
}
