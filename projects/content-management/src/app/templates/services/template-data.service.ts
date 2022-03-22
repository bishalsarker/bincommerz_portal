import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_HOST } from '../../constants/api-constants';
import { Slider } from '../../widgets/sliders/interfaces/slider';
import { Template } from '../interfaces/template';

@Injectable({
  providedIn: 'root'
})
export class TemplateDataService {
  templates$ = new BehaviorSubject<Template[]>([]);
  sliders$ = new BehaviorSubject<{name: string, value: string}[]>([]);
  banners$ = new BehaviorSubject<{name: string, value: string}[]>([]);

  rowTypes$: BehaviorSubject<{name: string, value: string}[]> = new BehaviorSubject([
    {
      name: "Slider",
      value: "slider"
    },
    {
      name: "Banner",
      value: "banner"
    },
    {
      name: "Section",
      value: "section"
    }
  ]);

  sectionTypes$: BehaviorSubject<{name: string, value: string}[]> = new BehaviorSubject([
    {
      name: "Category",
      value: "category"
    },
    {
      name: "Product",
      value: "product"
    }
  ]);
  
  constructor(
    private httpClient: HttpClient, 
    private toastr: ToastrService,
    private router: Router) 
  {
    this.getAllTemplates().subscribe();
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
            const data = response.data as Slider[];
            const sliders = [], banners = [];
            data.forEach((d) => {
              if (d.type === 'image') {
                sliders.push({
                  name: d.name,
                  value: d.id
                });
              }

              if (d.type === 'banner') {
                banners.push({
                  name: d.name,
                  value: d.id
                });
              }
            });

            this.sliders$.next(sliders);
            this.banners$.next(banners);
          } else {
            this.showError(response.message);
          }
        })
      );
  }

  getAllTemplates(): Observable<void> {
    return this.httpClient
      .get<any>(API_HOST + "templates/get/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            this.templates$.next(response.data as Template[]);
          } else {
            this.showError(response.message);
          }
        })
      );
  }

  getTemplate(templateId: string): Observable<Template> {
    return this.httpClient
      .get<any>(API_HOST + "templates/get/" + templateId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            return response.data as Template;
          } else {
            this.showError(response.message);
            return null;
          }
        })
      );
  }

  addTemplate(payload: Template): Observable<boolean> {
    return this.httpClient
      .post<any>(API_HOST + "templates/add", payload, {
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
            this.getAllTemplates().subscribe();
            this.router.navigate(["templates"]);
            this.toastr.success(`New template added`);
            return true;
          }
        })
      );
  }

  updateTemplate(payload: Template): Observable<boolean> {
    return this.httpClient
      .put<any>(API_HOST + "templates/update", {
        id: payload.id,
        templateData: payload
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
            this.getAllTemplates().subscribe();
            this.router.navigate(["templates"]);
            this.toastr.success(`Template updated`);
            return true;
          }
        })
      );
  }

  public deleteTemplate(templateId: string): Observable<void> {
    return this.httpClient
      .delete<any>(API_HOST + "templates/delete/" + templateId, {
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
            this.getAllTemplates().subscribe();
            this.router.navigate(["templates"]);
            this.toastr.success(`Template deleted`);
          }
        })
      );
  }

  private showError(message: string): void {
    this.toastr.error("", "Error occured: " + message);
  }
}
