import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Tag } from "../interfaces/tag";
import { find } from "lodash";
import { API_HOST } from 'projects/product-management/src/app/constants/api-constants';

@Injectable({
  providedIn: "root",
})
export class TagsDataService {
  tags = new BehaviorSubject<Tag[]>([]);

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.getAllTags().subscribe();
    console.log(this.tags.value);
  }

  resolveTags(idList: string[]): string[] {
    return idList.map((id: string) => {
      const tag: Tag = find(this.tags.value, (item: Tag) => {
        return item.id === id;
      });

      return tag ? tag.name : "invalid_tag";
    });
  }

  getAllTags(): Observable<void> {
    return this.httpClient
      .get<any>(API_HOST + "tags/get/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            this.tags.next(response.data as Tag[]);
          } else {
            this.showError();
          }
        })
      );
  }

  getTagById(tagId: string): Observable<Tag> {
    return this.httpClient
      .get<any>(API_HOST + "tags/get/" + tagId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            return response.data as Tag;
          } else {
            this.showError();
            return null;
          }
        })
      );
  }

  addTag(payload: Tag): Observable<void> {
    return this.httpClient
      .post<any>(API_HOST + "tags/addnew", payload, {
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
            this.getAllTags().subscribe();
            this.router.navigate(["tags"]);
            this.toastr.success(`New tag added: ${payload.name}`);
          }
        })
      );
  }

  updateTag(payload: Tag): Observable<void> {
    return this.httpClient
      .put<any>(API_HOST + "tags/update", payload, {
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
            this.getAllTags().subscribe();
            this.router.navigate(["tags"]);
            this.toastr.success(`Tag updated: ${payload.name}`);
          }
        })
      );
  }

  deleteTag(tagId: string): Observable<void> {
    return this.httpClient
      .delete<any>(API_HOST + "tags/delete/" + tagId, {
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
            this.getAllTags().subscribe();
            this.router.navigate(["tags"]);
            this.toastr.success(`Tag deleted`);
          }
        })
      );
  }

  private showError(): void {
    this.toastr.error("", "Error occured");
  }
}
