import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { BreadcrumbService } from "projects/content-management/src/app/shared/services/breadcrumb.service";
import { BehaviorSubject, Observable } from "rxjs";
import { SliderDataService } from "../../services/slider-data.service";

@Component({
  selector: "app-slider-form",
  templateUrl: "./slider-form.component.html",
  styleUrls: ["./slider-form.component.scss"],
})
export class SliderFormComponent implements OnInit {
  sliderId = new BehaviorSubject<string>(null);
  loading$ = new BehaviorSubject<boolean>(false);
  buttonText: string = "Create";
  disableAddBtn: boolean = false;

  sliderForm = new FormGroup({
    sliderName: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    sliderType: new FormControl("image", Validators.required),
  });
  
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

    if (this.isEditMode) {
      this.route.params.subscribe((param: ParamMap) => {
        const pageid: string = param["id"];
        this.sliderId.next(pageid);
        this.getSlider();
      });
    }
  }

  ngOnDestroy(): void {
    this.breadCrumbService.removeLast();
  }

  get sliderNameControl(): AbstractControl {
    return this.sliderForm.get("sliderName");
  }

  public get sliderTypeControl(): AbstractControl {
    return this.sliderForm.get("sliderType");
  }

  get isEditMode(): boolean {
    return this.route.snapshot.data["editMode"];
  }

  getSlider(): void{
    this.sliderDataService.getSlider(this.sliderId.value).subscribe((slider) => {
      if (slider) {
        this.sliderNameControl.setValue(slider.name);
        this.sliderTypeControl.setValue(slider.type);
      }
    });
  }

  addOrUpdateSlider(): void {
    this.disableAddBtn = true;
    this.buttonText = "Saving...";

    const add: Observable<boolean> = this.isEditMode
      ? this.updateSlider()
      : this.addSlider();

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

  addSlider(): Observable<boolean> {
    return this.sliderDataService.addSlider({
      name: this.sliderNameControl.value,
      type: this.sliderTypeControl.value
    });
  }

  updateSlider(): Observable<boolean> {
    return this.sliderDataService.addSlider({
      id: this.sliderId.value,
      name: this.sliderNameControl.value,
      type: this.sliderTypeControl.value
    });
  }
}
