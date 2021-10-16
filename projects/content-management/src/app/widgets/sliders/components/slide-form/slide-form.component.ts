import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BreadcrumbService } from 'projects/content-management/src/app/shared/services/breadcrumb.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { SliderDataService } from '../../services/slider-data.service';

@Component({
  selector: 'app-slide-form',
  templateUrl: './slide-form.component.html',
  styleUrls: ['./slide-form.component.scss']
})
export class SlideFormComponent implements OnInit {
  slideId$ = new BehaviorSubject<string>("");
  sliderId$ = new BehaviorSubject<string>("");

  slideForm = new FormGroup({
    title: new FormControl(""),
    description: new FormControl(""),
    buttonText: new FormControl(""),
    buttonUrl: new FormControl(""),
    image: new FormControl("", Validators.required),
  });

  disableAddBtn: boolean = false;
  buttonText: string = "Add";
  imageUrl: string | any = "./assets/images/product-placeholder.png";
  
  constructor(
    private breadCrumbService: BreadcrumbService,
    public sliderDataService: SliderDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param: ParamMap) => {
      const sliderid: string = param["sliderid"];
      this.sliderId$.next(sliderid);
    });

    if (this.isEditMode) {
      this.route.params.subscribe((param: ParamMap) => {
        const slideid: string = param["id"];
        this.slideId$.next(slideid);
        this.getSlide();
      });
    }
    
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

  getSlide(): void {
    this.sliderDataService.getSlide(this.slideId$.value).subscribe((slide) => {
      if (slide) {
        this.slideTitleControl.setValue(slide.title);
        this.slideDescriptionControl.setValue(slide.description);
        this.slideButtonTextControl.setValue(slide.buttonText);
        this.slideButtonUrlControl.setValue(slide.buttonUrl);
        this.imageUrl = slide.imageURL;

        this.slideImageControl.clearValidators();
        this.slideImageControl.updateValueAndValidity();
      }
    });
  }

  addOrUpdateSlide(): void {
    this.disableAddBtn = true;
    this.buttonText = "Saving...";

    const add: Observable<boolean> = this.isEditMode
      ? this.updateSlide()
      : this.addSlide();

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

  addSlide(): Observable<boolean> {
    return this.sliderDataService.addSlide({
      title: this.slideTitleControl.value,
      description: this.slideDescriptionControl.value,
      buttonText: this.slideButtonTextControl.value,
      buttonUrl: this.slideButtonUrlControl.value,
      image: this.slideImageControl.value,
      sliderId: this.sliderId$.value
    });
  }

  updateSlide(): Observable<boolean> {
    return this.sliderDataService.updateSlide({
      id: this.slideId$.value,
      title: this.slideTitleControl.value,
      description: this.slideDescriptionControl.value,
      buttonText: this.slideButtonTextControl.value,
      buttonUrl: this.slideButtonUrlControl.value,
      image: this.slideImageControl.value,
      sliderId: this.sliderId$.value
    });
  }

}
