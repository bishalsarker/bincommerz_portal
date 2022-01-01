import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { BreadcrumbService } from '../../../shared/services/breadcrumb.service';
import { TemplateDataService } from '../../services/template-data.service';

@Component({
  selector: 'app-template-from',
  templateUrl: './template-from.component.html',
  styleUrls: ['./template-from.component.scss']
})
export class TemplateFromComponent implements OnInit {
  templateId = new BehaviorSubject<string>(null);
  loading$ = new BehaviorSubject<boolean>(false);
  disableAddBtn: boolean = false;
  buttonText: string = "Add";

  templateForm = new FormGroup({
    templateName: new FormControl(""),
    content: new FormControl(""),
    isDefault: new FormControl(true)
  });

  constructor(
    public breadCrumbService: BreadcrumbService,
    public templateDataService: TemplateDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.breadCrumbService.addBreadcrumb({
      title: this.isEditMode ? "Edit" : "Add",
      route: "",
    });

    if (this.isEditMode) {
      this.route.params.subscribe((param: ParamMap) => {
        const templateid: string = param["id"];
        this.templateId.next(templateid);
        this.getTemplateById();
      });
    }

    this.buttonText =  this.isEditMode ? "Update" : "Add";
  }

  ngOnDestroy(): void {
    this.breadCrumbService.removeLast();
  }

  getTemplateById(): void {
    this.templateDataService.getTemplate(this.templateId.value).subscribe((template) => {
      if (template) {
        this.templateNameControl.setValue(template.name);
        this.contentControl.setValue(template.content);
        this.isDefaultControl.setValue(template.isDefault);
      }
    });
  }

  get templateNameControl(): AbstractControl {
    return this.templateForm.get("templateName");
  }

  get contentControl(): AbstractControl {
    return this.templateForm.get("content");
  }

  get isDefaultControl(): AbstractControl {
    return this.templateForm.get("isDefault");
  }

  get isEditMode(): boolean {
    return this.route.snapshot.data["editMode"];
  }

  addOrUpdateTemplate(): void {
    this.disableAddBtn = true;
    this.buttonText = "Saving...";

    const add: Observable<boolean> = this.isEditMode
      ? this.updateTemplate()
      : this.addTemplate();

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

  addTemplate(): Observable<boolean> {
    return this.templateDataService.addTemplate({
      name: this.templateNameControl.value,
      content: this.contentControl.value,
      isDefault: this.isDefaultControl.value
    });
  }

  updateTemplate(): Observable<boolean> {
    return this.templateDataService.updateTemplate({
      id: this.templateId.value,
      name: this.templateNameControl.value,
      content: this.contentControl.value,
      isDefault: this.isDefaultControl.value
    });
  }
}
