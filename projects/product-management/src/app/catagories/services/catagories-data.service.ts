import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { API_HOST } from 'projects/dashboard/src/app/constants/api-constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Catagory } from '../interfaces/catagory';

@Injectable({
  providedIn: 'root'
})
export class CatagoriesDataService {
  catagories = new BehaviorSubject<Catagory[]>([]);

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.getAllCatagories().subscribe();
  }

  getAllCatagories(): Observable<void> {
    return this.httpClient
      .get<any>(API_HOST + "categories/get/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            this.catagories.next(response.data as Catagory[]);
          } else {
            this.showError(response.message);
          }
        })
      );
  }

  getCategoryById(categoryId: string): Observable<Catagory> {
    return this.httpClient
      .get<any>(API_HOST + "categories/get/" + categoryId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            return response.data as Catagory;
          } else {
            this.showError(response.message);
            return null;
          }
        })
      );
  }

  addCategory(payload: Catagory): Observable<boolean> {
    return this.httpClient
      .post<any>(API_HOST + "categories/addnew", payload, {
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
            this.getAllCatagories().subscribe();
            this.router.navigate(["categories"]);
            this.toastr.success(`New category added: ${payload.name}`);
            return true;
          }
        })
      );
  }

  updateCategory(payload: Catagory): Observable<boolean> {
    return this.httpClient
      .put<any>(API_HOST + "categories/update", payload, {
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
            this.getAllCatagories().subscribe();
            this.router.navigate(["categories"]);
            this.toastr.success(`Category Updated: ${payload.name}`);
            return true;
          }
        })
      );
  }

  public deleteCategory(categoryId: string): Observable<void> {
    return this.httpClient
      .delete<any>(API_HOST + "categories/delete/" + categoryId, {
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
            this.getAllCatagories().subscribe();
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
