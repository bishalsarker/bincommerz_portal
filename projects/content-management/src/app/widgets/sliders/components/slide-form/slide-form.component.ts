import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'projects/content-management/src/app/shared/services/breadcrumb.service';
import { SliderDataService } from '../../services/slider-data.service';

@Component({
  selector: 'app-slide-form',
  templateUrl: './slide-form.component.html',
  styleUrls: ['./slide-form.component.scss']
})
export class SlideFormComponent implements OnInit {
  slideForm = new FormGroup({
    title: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    description: new FormControl(""),
    buttonText: new FormControl(""),
    buttonUrl: new FormControl(""),
    image: new FormControl("", Validators.required),
  });

  disableAddBtn: boolean = false;
  buttonText: string = "Add";
  imageUrl: string = null;
  
  constructor(
    private breadCrumbService: BreadcrumbService,
    public sliderDataService: SliderDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.buttonText =  this.isEditMode ? "Save" : "Add";
  }

  ngOnDestroy(): void {
    this.breadCrumbService.removeLast();
  }

  get slideTitleControl(): AbstractControl {
    return this.slideForm.get("title");
  }

  get slideDescriptionControl(): AbstractControl {
    return this.slideForm.get("description");
  }

  get slideButtonTextControl(): AbstractControl {
    return this.slideForm.get("buttonText");
  }

  get slideButtonUrlControl(): AbstractControl {
    return this.slideForm.get("buttonUrl");
  }

  get slideImageControl(): AbstractControl {
    return this.slideForm.get("image");
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
      this.slideImageControl.setValue(imageData.split(",")[1]);
    };
  }

}
