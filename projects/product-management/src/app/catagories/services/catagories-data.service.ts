import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { API_HOST } from 'projects/product-management/src/app/constants/api-constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Catagory } from '../interfaces/catagory';
import * as _ from 'lodash';
import { LoaderService } from '../../shared/services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class CatagoriesDataService {
  category = new BehaviorSubject<Catagory>(null);
  catagories = new BehaviorSubject<Catagory[]>([]);
  subCatagories = new BehaviorSubject<Catagory[]>([]);

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private router: Router
  ) {
    
  }

  getAllCatagories(): Observable<void> {
    this.loaderService.isLoading.next(true);
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
            const sortedCategories: Catagory[] = _.orderBy(response.data, ['order'], ['asc']);
            this.catagories.next(sortedCategories);
            this.loaderService.isLoading.next(false);
          } else {
            this.showError(response.message);
          }
        })
      );
  }

  getSubCatagories(catid: string): Observable<void> {
    this.loaderService.isLoading.next(true);
    return this.httpClient
      .get<any>(API_HOST + "categories/get/subcategories/" + catid, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            this.category.next(response.data);
            this.subCatagories.next(response.data.subcategories as Catagory[]);
            this.loaderService.isLoading.next(false);
          } else {
            this.showError(response.message);
          }
        })
      );
  }

  getCategoryById(categoryId: string): Observable<Catagory> {
    this.loaderService.isLoading.next(true);
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
            this.loaderService.isLoading.next(false);
            return response.data as Catagory;
          } else {
            this.showError(response.message);
            return null;
          }
        })
      );
  }

  addCategory(payload: Catagory): Observable<boolean> {
    this.loaderService.isLoading.next(true);
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
            
            if (!payload.parentCategoryId) {
              this.router.navigate(["categories"]);
            } else {
              this.router.navigate(["categories", "subcategories", payload.parentCategoryId]);
            }

            this.toastr.success(`New category added: ${payload.name}`);
            this.loaderService.isLoading.next(false);
            return true;
          }
        })
      );
  }

  updateCategory(payload: Catagory): Observable<boolean> {
    this.loaderService.isLoading.next(true);
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
            this.loaderService.isLoading.next(false);
            this.getAllCatagories().subscribe();
            this.router.navigate(["categories"]);
            this.toastr.success(`Category Updated: ${payload.name}`);
            return true;
          }
        })
      );
  }
  
  saveCategoryOrder(payload: {id: string, order: number}[]): Observable<boolean> {
    this.loaderService.isLoading.next(true);
    return this.httpClient
      .put<any>(API_HOST + "categories/updateorder", payload, {
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
            this.getAllCatagories().subscribe();
            this.router.navigate(["categories"]);
            this.toastr.success(`Category Orders Updated`);
            return true;
          }
        })
      );
  }

  public deleteCategory(categoryId: string): Observable<void> {
    this.loaderService.isLoading.next(true);
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
            this.loaderService.isLoading.next(false);
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
