import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BreadcrumbService } from "projects/content-management/src/app/shared/services/breadcrumb.service";
import { SliderDataService } from "../../services/slider-data.service";

@Component({
  selector: "app-slider-form",
  templateUrl: "./slider-form.component.html",
  styleUrls: ["./slider-form.component.scss"],
})
export class SliderFormComponent implements OnInit {
  pageForm = new FormGroup({
    sliderName: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    sliderType: new FormControl("image", Validators.required),
  });

  buttonText: string = "Create";
  
  constructor(
    private route: ActivatedRoute,
    private breadCrumbService: BreadcrumbService,
    public sliderDataService: SliderDataService
  ) {}

  ngOnInit() {
    this.breadCrumbService.addBreadcrumb({
      title: this.isEditMode ? "Edit" : "Add",
      route: "",
    });

    this.buttonText =  this.isEditMode ? "Update" : "Create";
  }

  ngOnDestroy(): void {
    this.breadCrumbService.removeLast();
  }

  get sliderNameControl(): AbstractControl {
    return this.pageForm.get("sliderName");
  }

  public get sliderTypeControl(): AbstractControl {
    return this.pageForm.get("sliderType");
  }

  get isEditMode(): boolean {
    return this.route.snapshot.data["editMode"];
  }
}
