import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_HOST } from '../../constants/api-constants';
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
    private router: Router) 
  {
    this.getAllPages().subscribe();
  }

  getAllPages(): Observable<void> {
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
          } else {
            this.showError(response.message);
          }
        })
      );
  }

  getPage(pageId: string): Observable<Page> {
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
            return response.data as Page;
          } else {
            this.showError(response.message);
            return null;
          }
        })
      );
  }

  addPage(payload: Page): Observable<boolean> {
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
            this.getAllPages().subscribe();
            this.router.navigate(["pages"]);
            this.toastr.success(`New page added`);
            return true;
          }
        })
      );
  }

  updatePage(payload: Page): Observable<boolean> {
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
            this.getAllPages().subscribe();
            this.router.navigate(["pages"]);
            this.toastr.success(`Page updated`);
            return true;
          }
        })
      );
  }

  public deletePage(pageId: string): Observable<void> {
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
