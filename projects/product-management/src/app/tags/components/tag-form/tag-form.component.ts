import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { BreadcrumbService } from "../../../shared/services/breadcrumb.service";
import { TagsDataService } from "../../services/tags-data.service";

@Component({
  selector: "app-tag-form",
  templateUrl: "./tag-form.component.html",
  styleUrls: ["./tag-form.component.scss"],
})
export class TagFormComponent implements OnInit {
  tagId = new BehaviorSubject<string>(null);

  tagForm = new FormGroup({
    name: new FormControl("", Validators.required),
    description: new FormControl(""),
  });

  disableAddBtn: boolean = false;
  buttonText: string = "Save";

  constructor(
    public breadCrumbService: BreadcrumbService,
    private tagsDataService: TagsDataService,
    private route: ActivatedRoute
  ) {}

  get nameControl(): AbstractControl {
    return this.tagForm.get("name");
  }

  get descriptionControl(): AbstractControl {
    return this.tagForm.get("description");
  }

  ngOnInit() {
    this.breadCrumbService.addBreadcrumb({
      title: this.isEditMode ? "Edit" : "Add",
      route: "",
    });

    if (this.isEditMode) {
      this.route.params.subscribe((param: ParamMap) => {
        const tagid: string = param["id"];
        this.tagId.next(tagid);
        this.getTagById();
      });
    }

    this.buttonText = this.isEditMode ? "Update" : "Save";
  }

  ngOnDestroy(): void {
    this.breadCrumbService.removeLast();
  }

  addOrUpdateTag(): void {
    this.disableAddBtn = true;
    this.buttonText = "Saving...";
    const add: Observable<void> = this.isEditMode
      ? this.updateTag()
      : this.addTag();

    add.subscribe(() => {}, () => {
      this.disableAddBtn = false;
      this.buttonText = "Save";
    });
  }

  getTagById(): void {
    this.tagsDataService.getTagById(this.tagId.value).subscribe((tag) => {
      if (tag) {
        this.nameControl.setValue(tag.name);
        this.descriptionControl.setValue(tag.description);
      }
    });
  }

  private get isEditMode(): boolean {
    return this.route.snapshot.data["editMode"];
  }

  private addTag(): Observable<void> {
    return this.tagsDataService.addTag({
      name: this.nameControl.value,
      description: this.descriptionControl.value,
    });
  }

  private updateTag(): Observable<void> {
    return this.tagsDataService.updateTag({
      id: this.tagId.value,
      name: this.nameControl.value,
      description: this.descriptionControl.value,
    });
  }
}
