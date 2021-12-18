import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { API_HOST } from 'projects/product-management/src/app/constants/api-constants';
import { BehaviorSubject, forkJoin, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { STATIC_FILES_ENDPOINT } from "../../constants/api-constants";
import { TagsDataService } from "../../tags/services/tags-data.service";
import { Product } from "../interfaces/product";

@Injectable({
  providedIn: "root",
})
export class ProductDataService {
  loading$ = new BehaviorSubject<boolean>(false);
  products$ = new BehaviorSubject<Product[]>([]);
  pageSize$ = new BehaviorSubject<Number>(5);
  pageNumber$ = new BehaviorSubject<Number>(1);
  totalPages$ = new BehaviorSubject<Number[]>([]);

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private tagsService: TagsDataService
  ) {
    this.pageSize$.subscribe(() => {
      this.getAllProducts().subscribe();
    });

    this.pageNumber$.subscribe(() => {
      this.getAllProducts().subscribe();
    })

  }

  getAllProducts(): Observable<void> {
    this.loading$.next(true);
    return this.httpClient
      .get<any>(API_HOST + "products/get/all", {
        params: {
          sort_by: "newest",
          page_size: this.pageSize$.value.toString(),
          page_number: this.pageNumber$.value.toString()
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            const data: Product[] = response.data.products.map((product) => {
              return {
                id: product.id,
                name: product.name,
                description: product.description,
                image: product.imageUrl,
                price: product.price,
                discount: product.discount,
                stockQuantity: product.stockQuantity,
                tags: this.tagsService.resolveTags(product.tags),
              };
            });
            this.products$.next(data);
            const pageNumbers = [];
            for(let i = 1; i <= response.data.totalPages; i++) {
              pageNumbers.push(i);
            }
            this.totalPages$.next(pageNumbers);
            this.loading$.next(false);
          } else {
            this.showError();
            this.loading$.next(false);
          }
        })
      );
  }

  getProductById(id: string): Observable<Product> {
    return this.httpClient
      .get<any>(API_HOST + "products/get/" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            const product: any = response.data;
            return {
              id: product.id,
              name: product.name,
              description: product.description,
              image: product.imageUrl,
              price: product.price,
              inStock: product.inStock,
              stockQuantity: product.stockQuantity,
              discount: product.discount,
              tags: product.tags,
            };
          } else {
            this.showError();
            return null;
          }
        })
      );
  }

  addProduct(payload: Product): Observable<void> {
    return this.httpClient
      .post<any>(API_HOST + "products/addnew", payload, {
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
            this.getAllProducts().subscribe();
            this.router.navigate(["products"]);
            this.toastr.success(`New product added: ${payload.name}`);
          }
        })
      );
  }

  updateProduct(payload: Product): Observable<void> {
    return this.httpClient
      .put<any>(API_HOST + "products/update", payload, {
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
            this.getAllProducts().subscribe();
            this.router.navigate(["products"]);
            this.toastr.success(`Product updated. You may need to refresh the page.`);
          }
        })
      );
  }

  deleteTag(id: string): Observable<void> {
    return this.httpClient
      .delete<any>(API_HOST + "products/delete/" + id, {
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
            this.getAllProducts().subscribe();
            this.router.navigate(["products"]);
            this.toastr.success(`Product deleted`);
          }
        })
      );
  }

  resolveProductImage(product: Product): string {
    return product.image && product.image.trim() !== ""
      ? STATIC_FILES_ENDPOINT + product.image
      : API_HOST + "images/default.png";
  }

  private showError(): void {
    this.toastr.error("", "Error occured");
  }
}
