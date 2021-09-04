import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { BehaviorSubject, Observable, ObservedValueOf } from 'rxjs';
import { BreadcrumbService } from '../../../shared/services/breadcrumb.service';
import { PagesDataService } from '../../services/pages-data.service';

@Component({
  selector: 'app-page-form',
  templateUrl: './page-form.component.html',
  styleUrls: ['./page-form.component.scss']
})
export class PageFormComponent implements OnInit {
  pageId = new BehaviorSubject<string>(null);
  loading$ = new BehaviorSubject<boolean>(false);
  disableAddBtn: boolean = false;
  buttonText: string = "Publish";

  pageForm = new FormGroup({
    pageTitle: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    pageCategory: new FormControl("faq", Validators.required),
    linkTitle: new FormControl(""),
    slug: new FormControl("", Validators.required),
    content: new FormControl(""),
    url: new FormControl(""),
    isPublished: new FormControl(true)
  });

  constructor(
    public breadCrumbService: BreadcrumbService,
    public pagesdataService: PagesDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.setContentValidators(this.pageCategoryControl.value);

    this.pageCategoryControl.valueChanges.subscribe((value) => {
      this.setContentValidators(value);
    });

    this.breadCrumbService.addBreadcrumb({
      title: this.isEditMode ? "Edit" : "Add",
      route: "",
    });

    if (this.isEditMode) {
      this.route.params.subscribe((param: ParamMap) => {
        const pageid: string = param["id"];
        this.pageId.next(pageid);
        this.getPageById();
        this.slugControl.disable();
      });
    }

    this.buttonText =  this.isEditMode ? "Update" : "Publish";
  }

  ngOnDestroy(): void {
    this.breadCrumbService.removeLast();
  }

  setContentValidators(value: string): void {
    if (value === 'externallink') {
      this.urlControl.setValidators(Validators.required);
    } else {
      this.contentControl.setValidators(Validators.required);
    }

    if (value !== 'faq') {
      this.linkTitleControl.setValidators([Validators.required, Validators.maxLength(50)]);
    } else {
      this.linkTitleControl.clearValidators();
      this.linkTitleControl.updateValueAndValidity();
    }
  }

  getPageById(): void {
    this.pagesdataService.getPage(this.pageId.value).subscribe((page) => {
      if (page) {
        this.pageTitleControl.setValue(page.pageTitle);
        this.pageCategoryControl.setValue(page.category);
        this.slugControl.setValue(page.slug);
        this.linkTitleControl.setValue(page.linkTitle);
        this.contentControl.setValue(page.content);
        this.isPublishedControl.setValue(page.isPublished);
      }
    });
  }

  get pageTitleControl(): AbstractControl {
    return this.pageForm.get("pageTitle");
  }

  get contentControl(): AbstractControl {
    return this.pageForm.get("content");
  }

  public get pageCategoryControl(): AbstractControl {
    return this.pageForm.get("pageCategory");
  }

  get linkTitleControl(): AbstractControl {
    return this.pageForm.get("linkTitle"); 
  }

  get slugControl(): AbstractControl {
    return this.pageForm.get("slug");
  }

  get urlControl(): AbstractControl {
    return this.pageForm.get("url");
  }

  get isPublishedControl(): AbstractControl {
    return this.pageForm.get("isPublished");
  }

  get isEditMode(): boolean {
    return this.route.snapshot.data["editMode"];
  }

  addOrUpdatePage(): void {
    let isValid = true;

    if (!this.slugControl.value.match(/^[a-zA-Z0-9-_]+$/)) {
      isValid = false;
      alert("Slug is not valid. Please use only allowed characters.")
    }

    if (isValid) {
      this.disableAddBtn = true;
      this.buttonText = "Saving...";

      const add: Observable<boolean> = this.isEditMode
        ? this.updatePage()
        : this.addPage();

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

  addPage(): Observable<boolean> {
    return this.pagesdataService.addPage({
      pageTitle: this.pageTitleControl.value,
      slug: this.slugControl.value,
      category: this.pageCategoryControl.value,
      linkTitle: this.linkTitleControl.value,
      content: (this.pageCategoryControl.value === 'externallink') ?
      this.urlControl.value : this.contentControl.value,
      isPublished: this.isPublishedControl.value
    });
  }

  updatePage(): Observable<boolean> {
    return this.pagesdataService.updatePage({
      id: this.pageId.value,
      pageTitle: this.pageTitleControl.value,
      slug: this.slugControl.value,
      category: this.pageCategoryControl.value,
      linkTitle: this.linkTitleControl.value,
      content: (this.pageCategoryControl.value === 'externallink') ?
      this.urlControl.value : this.contentControl.value,
      isPublished: this.isPublishedControl.value
    });
  }

}
