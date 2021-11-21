import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BreadcrumbService } from 'projects/account-management/src/app/shared/services/breadcrumb.service';
import { STATIC_FILES_ENDPOINT } from 'projects/content-management/src/app/constants/api-constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TagsDataService } from '../../../tags/services/tags-data.service';
import { Catagory } from '../../interfaces/catagory';
import { CatagoriesDataService } from '../../services/catagories-data.service';

@Component({
  selector: 'app-subcat-form',
  templateUrl: './subcat-form.component.html',
  styleUrls: ['./subcat-form.component.scss']
})
export class SubcatFormComponent implements OnInit {

  tags$ = new BehaviorSubject<any[]>([]);
  categoryId = new BehaviorSubject<string>(null);
  parentCategoryId = new BehaviorSubject<string>(null);
  imageUrl: string | any = "./assets/images/product-placeholder.png";

  categoryForm = new FormGroup({
    name: new FormControl("", Validators.required),
    slug: new FormControl("", Validators.required),
    description: new FormControl(""),
    tag: new FormControl("", Validators.required),
  });

  disableAddBtn: boolean = false;
  buttonText: string = "Save";

  constructor(
    public breadCrumbService: BreadcrumbService,
    private tagsDataService: TagsDataService,
    private catagoryDataService: CatagoriesDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.breadCrumbService.addBreadcrumb({
      title: this.isEditMode ? "Edit" : "Add",
      route: "",
    });

    this.setTags();

    this.route.params.subscribe((param: ParamMap) => {
      const parentcatid: string = param["categoryid"];
      console.log(parentcatid);
      this.parentCategoryId.next(parentcatid);
    });

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

  get slugControl(): AbstractControl {
    return this.categoryForm.get("slug");
  }

  get parentCategory(): Catagory {
    return this.catagoryDataService.category.value;
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
      description: this.descriptionControl.value,
      parentCategoryId: this.parentCategoryId.value
    });
  }

  private updateCategory(): Observable<boolean> {
    return this.catagoryDataService.updateCategory({
      id: this.categoryId.value,
      name: this.nameControl.value,
      tagHashId: this.tagsControl.value,
      slug: this.slugControl.value,
      description: this.descriptionControl.value,
    });
  }

  public cancelForm(): void {
    this.router.navigateByUrl('/categories/subcategories/' + this.parentCategoryId.value)
  }
}
