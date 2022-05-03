import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { API_HOST } from 'projects/content-management/src/app/constants/api-constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoaderService } from '../../shared/services/loader.service';
import { Page } from '../interfaces/Page';

@Injectable({
  providedIn: 'root'
})
export class PagesDataService {
  pages$ = new BehaviorSubject<Page[]>([]);

  categories$: BehaviorSubject<{name: string, value: string}[]> = new BehaviorSubject([
    {
      name: "Frequently Asked Question",
      value: "faq"
    },
    {
      name: "About",
      value: "about"
    },
    {
      name: "Support",
      value: "support"
    },
    {
      name: "Useful Link",
      value: "usefullink"
    },
    {
      name: "Nav Link",
      value: "navbarlink"
    },
    // {
    //   name: "Article",
    //   value: "article"
    // },
    // {
    //   name: "External Link",
    //   value: "externallink"
    // }
  ]);

  constructor(
    private httpClient: HttpClient, 
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private router: Router) 
  {
    this.getAllPages().subscribe();
  }

  getAllPages(): Observable<void> {
    this.loaderService.isLoading.next(true);
    return this.httpClient
      .get<any>(API_HOST + "pages/get/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            this.pages$.next(response.data as Page[]);
            this.loaderService.isLoading.next(false);
          } else {
            this.showError(response.message);
          }
        })
      );
  }

  getPage(pageId: string): Observable<Page> {
    this.loaderService.isLoading.next(true);
    return this.httpClient
      .get<any>(API_HOST + "pages/get/" + pageId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            this.loaderService.isLoading.next(false);
            return response.data as Page;
          } else {
            this.showError(response.message);
            return null;
          }
        })
      );
  }

  addPage(payload: Page): Observable<boolean> {
    this.loaderService.isLoading.next(true);
    return this.httpClient
      .post<any>(API_HOST + "pages/add", payload, {
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
            this.loaderService.isLoading.next(false);
            this.getAllPages().subscribe();
            this.router.navigate(["pages"]);
            this.toastr.success(`New page added`);
            return true;
          }
        })
      );
  }

  updatePage(payload: Page): Observable<boolean> {
    this.loaderService.isLoading.next(true);
    return this.httpClient
      .put<any>(API_HOST + "pages/update", payload, {
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
            this.loaderService.isLoading.next(false);
            this.getAllPages().subscribe();
            this.router.navigate(["pages"]);
            this.toastr.success(`Page updated`);
            return true;
          }
        })
      );
  }

  public deletePage(pageId: string): Observable<void> {
    this.loaderService.isLoading.next(true);
    return this.httpClient
      .delete<any>(API_HOST + "pages/delete/" + pageId, {
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
            this.loaderService.isLoading.next(false);
            this.getAllPages().subscribe();
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
