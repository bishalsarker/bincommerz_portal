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

  private showError(message: string): void {
    this.toastr.error("", "Error occured: " + message);
  }
}
