import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BreadcrumbService } from 'projects/dashboard/src/app/shared/services/breadcrumb.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { STATIC_FILES_ENDPOINT } from '../../../constants/api-constants';
import { TagsDataService } from '../../../tags/services/tags-data.service';
import { CatagoriesDataService } from '../../services/catagories-data.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  tags$ = new BehaviorSubject<any[]>([]);
  categoryId = new BehaviorSubject<string>(null);
  imageUrl: string | any = "./assets/images/product-placeholder.png";

  categoryForm = new FormGroup({
    name: new FormControl("", Validators.required),
    slug: new FormControl("", Validators.required),
    description: new FormControl(""),
    tag: new FormControl("", Validators.required),
    image: new FormControl("", Validators.required),
  });

  disableAddBtn: boolean = false;
  buttonText: string = "Save";

  constructor(
    public breadCrumbService: BreadcrumbService,
    private tagsDataService: TagsDataService,
    private catagoryDataService: CatagoriesDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.breadCrumbService.addBreadcrumb({
      title: this.isEditMode ? "Edit" : "Add",
      route: "",
    });

    this.setTags();

    if (this.isEditMode) {
      this.slugControl.disable();

      this.route.params.subscribe((param: ParamMap) => {
        const catid: string = param["id"];
        this.categoryId.next(catid);
        this.getCategoryById();
      });
    }

    this.buttonText = this.isEditMode ? "Update" : "Save";
  }

  ngOnDestroy(): void {
    this.breadCrumbService.removeLast();
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

  get nameControl(): AbstractControl {
    return this.categoryForm.get("name");
  }

  get descriptionControl(): AbstractControl {
    return this.categoryForm.get("description");
  }

  get tagsControl(): AbstractControl {
    return this.categoryForm.get("tag");
  }

  get imageControl(): AbstractControl {
    return this.categoryForm.get("image");
  }

  get slugControl(): AbstractControl {
    return this.categoryForm.get("slug");
  }

  addOrUpdateCatagory(): void {
    let isValid = true;

    if (!this.slugControl.value.match(/^[a-zA-Z0-9-_]+$/)) {
      isValid = false;
      alert("Slug is not valid. Please use only allowed characters.")
    }

    if (isValid) {
      this.disableAddBtn = true;
      this.buttonText = "Saving...";
      const add: Observable<boolean> = this.isEditMode
        ? this.updateCategory()
        : this.addCatagory();

      add.subscribe((isSuccess: boolean) => {
        if (!isSuccess) {
          this.disableAddBtn = false;
          this.buttonText = "Save";
        }
      }, () => {
        this.disableAddBtn = false;
        this.buttonText = "Save";
      });
    }
  }

  getCategoryById(): void {
    this.catagoryDataService.getCategoryById(this.categoryId.value).subscribe((cat) => {
      if (cat) {
        this.nameControl.setValue(cat.name);
        this.tagsControl.setValue(cat.tagHashId);
        this.descriptionControl.setValue(cat.description);
        this.slugControl.setValue(cat.slug);
        this.imageControl.setValue(STATIC_FILES_ENDPOINT + cat.imageUrl);
        this.imageUrl = STATIC_FILES_ENDPOINT + cat.imageUrl;
      }
    });
  }

  private get isEditMode(): boolean {
    return this.route.snapshot.data["editMode"];
  }

  private addCatagory(): Observable<boolean> {
    return this.catagoryDataService.addCategory({
      name: this.nameControl.value,
      slug: this.slugControl.value,
      tagHashId: this.tagsControl.value,
      image: this.imageControl.value,
      description: this.descriptionControl.value,
    });
  }

  private updateCategory(): Observable<boolean> {
    return this.catagoryDataService.updateCategory({
      id: this.categoryId.value,
      name: this.nameControl.value,
      tagHashId: this.tagsControl.value,
      slug: this.slugControl.value,
      image: this.imageControl.value,
      description: this.descriptionControl.value,
    });
  }

  handleFileInput(file: File): void {
    if(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        const imageData: string = reader.result as string;
        this.imageUrl = imageData;
        this.imageControl.setValue(imageData.split(",")[1]);
      };
    }
  }

}
