import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { finalize, map } from "rxjs/operators";
import { BreadcrumbService } from "../../../shared/services/breadcrumb.service";
import { TagsDataService } from "../../../tags/services/tags-data.service";
import { ProductDataService } from "../../services/product-data.service";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.scss"],
})
export class ProductFormComponent implements OnInit {
  productId = new BehaviorSubject<string>(null);
  loading$ = new BehaviorSubject<boolean>(false);
  imageUrl: string | any = "./assets/images/product-placeholder.png";
  tags$ = new BehaviorSubject<any[]>([]);
  disableAddBtn: boolean = false;
  buttonText: string = "Save";

  productForm = new FormGroup({
    name: new FormControl("", Validators.required),
    description: new FormControl(""),
    image: new FormControl("", Validators.required),
    price: new FormControl(0.0),
    discount: new FormControl(0.0),
    tags: new FormControl([]),
    stockQuantity: new FormControl(0.0)
  });

  constructor(
    public breadCrumbService: BreadcrumbService,
    private productdataService: ProductDataService,
    private tagsDataService: TagsDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.breadCrumbService.addBreadcrumb({
      title: this.isEditMode ? "Edit" : "Add",
      route: "",
    });

    this.setTags();

    if (this.isEditMode) {
      this.route.params.subscribe((param: ParamMap) => {
        const productid: string = param["id"];
        this.productId.next(productid);
        this.imageControl.clearValidators();
        this.imageControl.updateValueAndValidity();
        this.getProductById();
      });
    }

    this.buttonText =  this.isEditMode ? "Update" : "Add";
  }

  ngOnDestroy(): void {
    this.breadCrumbService.removeLast();
  }

  getProductById(): void {
    this.loading$.next(true);

    this.productdataService
      .getProductById(this.productId.value)
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe((product) => {
        if (product) {
          this.nameControl.setValue(product.name);
          this.descriptionControl.setValue(product.description);
          this.priceControl.setValue(product.price);
          this.discountControl.setValue(product.discount);
          this.tagsControl.setValue(product.tags);
          this.imageUrl = this.productdataService.resolveProductImage(product);
          this.stockQuantityControl.setValue(product.stockQuantity);
        }
      });
  }

  get nameControl(): AbstractControl {
    return this.productForm.get("name");
  }

  get descriptionControl(): AbstractControl {
    return this.productForm.get("description");
  }

  get priceControl(): AbstractControl {
    return this.productForm.get("price");
  }

  get discountControl(): AbstractControl {
    return this.productForm.get("discount");
  }

  get imageControl(): AbstractControl {
    return this.productForm.get("image");
  }

  get tagsControl(): AbstractControl {
    return this.productForm.get("tags");
  }

  get stockQuantityControl(): AbstractControl {
    return this.productForm.get("stockQuantity");
  }

  get isEditMode(): boolean {
    return this.route.snapshot.data["editMode"];
  }

  handleFileInput(file: File): void {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      const imageData: string = reader.result as string;
      this.imageUrl = imageData;
      this.imageControl.setValue(imageData.split(",")[1]);
    };
  }

  addOrUpdateProduct(): void {
    this.disableAddBtn = true;
    this.buttonText = "Saving...";

    const add: Observable<void> = this.isEditMode
      ? this.updateProduct()
      : this.addProduct();

    add.subscribe(() => {}, () => {
      this.disableAddBtn = false;
      this.buttonText = "Save";
    });
  }

  addProduct(): Observable<void> {
    return this.productdataService.addProduct({
      name: this.nameControl.value,
      description: this.descriptionControl.value,
      image: this.imageControl.value,
      price: this.priceControl.value,
      discount: this.discountControl.value,
      stockQuantity: this.stockQuantityControl.value,
      tags: this.tagsControl.value,
    });
  }

  updateProduct(): Observable<void> {
    return this.productdataService.updateProduct({
      id: this.productId.value,
      name: this.nameControl.value,
      description: this.descriptionControl.value,
      image: this.imageControl.value,
      price: this.priceControl.value,
      discount: this.discountControl.value,
      stockQuantity: this.stockQuantityControl.value,
      tags: this.tagsControl.value,
    });
  }

  gotoImgGallery(): void {
    this.router.navigateByUrl('/products/image_gallery/' + this.productId.value);
  }

  private setTags(): void {
    this.tagsDataService.tags
      .pipe(
        map((tags) => {
          return tags.map((tag) => {
            return { name: tag.name, value: tag.id };
          });
        })
      )
      .subscribe((data) => this.tags$.next(data));
  }
}
