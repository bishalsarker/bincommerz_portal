import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { API_HOST } from 'projects/dashboard/src/app/constants/api-constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingsDataService {
  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private router: Router) { }

  updateSettings(payload: any): Observable<boolean> {
    return this.httpClient
      .patch<any>(API_HOST + "auth/updateshop", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
    }).pipe(
      map((response) => {
        if (!response.isSuccess) {
          this.showError(response.message);
          return false;
        } else {
          this.router.navigate(["dashboard"]);
          this.toastr.success(`Settings updated`);
          return true;
        }
      })
    );
  }

  updatePassword(payload: { oldPassword: string, newPassword: string }): Observable<boolean> {
    return this.httpClient
      .patch<any>(API_HOST + "auth/updatepassword", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
    }).pipe(
      map((response) => {
        if (!response.isSuccess) {
          this.showError(response.message);
          return false;
        } else {
          return true;
        }
      })
    );
  }

  getShopDomains(): Observable<any> {
    return this.httpClient
      .get<any>(API_HOST + "auth/domains", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
    }).pipe(
      map((response) => {
        if (!response.isSuccess) {
          this.showError(response.message);
          return null;
        } else {
          return response.data;
        }
      })
    );
  }

  addAppURL(): Observable<any> {
    return this.httpClient
      .post<any>(API_HOST + "auth/domains/app_url", null, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
    }).pipe(
      map((response) => {
        if (!response.isSuccess) {
          this.showError(response.message);
          return null;
        } else {
          return response.data;
        }
      })
    );
  }

  addDomainURL(payload: { url: string }): Observable<any> {
    return this.httpClient
      .post<any>(API_HOST + "auth/domains", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
    }).pipe(
      map((response) => {
        if (!response.isSuccess) {
          this.showError(response.message);
          return null;
        } else {
          return response.data;
        }
      })
    );
  }

  deleteDomainRecord(id: string): Observable<any> {
    return this.httpClient
      .delete<any>(API_HOST + "auth/domains/delete/" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
    }).pipe(
      map((response) => {
        if (!response.isSuccess) {
          this.showError(response.message);
          return null;
        } else {
          window.location.reload();
          return response.data;
        }
      })
    );
  }

  private showError(message: string): void {
    this.toastr.error("", "Error occured: " + message);
  }
}
