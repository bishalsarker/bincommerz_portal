import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { BreadcrumbService } from '../../../shared/services/breadcrumb.service';
import { TemplateDataService } from '../../services/template-data.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-template-from',
  templateUrl: './template-from.component.html',
  styleUrls: ['./template-from.component.scss']
})
export class TemplateFromComponent implements OnInit {
  templateId = new BehaviorSubject<string>(null);
  templateContent: any[] = [];
  loading$ = new BehaviorSubject<boolean>(false);
  disableAddBtn: boolean = false;
  buttonText: string = "Add";

  showSliderFields: boolean = false;
  showBannerFields: boolean = false;
  showSectionFields: boolean = false;
  showProductFields: boolean = false;

  templateForm = new FormGroup({
    templateName: new FormControl(""),
    rowType: new FormControl("slider"),
    selectedSlider: new FormControl(null),
    selectedBanner: new FormControl(null),
    sectionType: new FormControl("category"),
    sectionName: new FormControl(""),
    selectedCategory: new FormControl(null),
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

    this.rowTypeControl.valueChanges.subscribe((value) => {
      if (value === 'slider') {
        this.showSliderFields = true;
        this.showBannerFields = false;
        this.showSectionFields = false;
        this.showProductFields = false;
      }

      if (value === 'banner') {
        this.showSliderFields = false;
        this.showBannerFields = true;
        this.showSectionFields = false;
        this.showProductFields = false;
      }

      if (value === 'section') {
        this.showSliderFields = false;
        this.showBannerFields = false;
        this.showSectionFields = true;
        this.showProductFields = false;
      }
    });

    this.sectionTypeControl.valueChanges.subscribe((value) => {
      if (value === 'product') {
        this.showSliderFields = false;
        this.showBannerFields = false;
        this.showSectionFields = true;
        this.showProductFields = true;
      }

      if (value === 'category') {
        this.showSliderFields = false;
        this.showBannerFields = false;
        this.showSectionFields = true;
        this.showProductFields = false;
      }
    });

    console.log(this.templateContent)
  }

  ngOnDestroy(): void {
    this.breadCrumbService.removeLast();
  }

  getTemplateById(): void {
    this.templateDataService.getTemplate(this.templateId.value).subscribe((template) => {
      if (template) {
        this.templateNameControl.setValue(template.name);
        this.rowTypeControl.setValue(template.content);
        this.isDefaultControl.setValue(template.isDefault);
        this.templateContent = JSON.parse(template.content);
        console.log(this.templateContent)
      }
    });
  }

  get templateNameControl(): AbstractControl {
    return this.templateForm.get("templateName");
  }

  get rowTypeControl(): AbstractControl {
    return this.templateForm.get("rowType");
  }

  get sectionTypeControl(): AbstractControl {
    return this.templateForm.get("sectionType");
  }

  get sectionNameControl(): AbstractControl {
    return this.templateForm.get("sectionName");
  }

  get selectedSliderControl(): AbstractControl {
    return this.templateForm.get("selectedSlider");
  }

  get selectedBannerControl(): AbstractControl {
    return this.templateForm.get("selectedBanner");
  }

  get selectedCategoryControl(): AbstractControl {
    return this.templateForm.get("selectedCategory");
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
      content: JSON.stringify(this.templateContent),
      isDefault: this.isDefaultControl.value
    });
  }

  updateTemplate(): Observable<boolean> {
    return this.templateDataService.updateTemplate({
      id: this.templateId.value,
      name: this.templateNameControl.value,
      content: JSON.stringify(this.templateContent),
      isDefault: this.isDefaultControl.value
    });
  }

  addRow(): void {
    const row_number = this.templateContent.length + 1;
    const rowType = this.rowTypeControl.value;
    let newRowData = {
      row_number: row_number,
      type: rowType,
      resolve: null
    }

    console.log(this.selectedSliderControl.value, this.selectedBannerControl.value)

    if (rowType === 'slider') {
      newRowData.resolve = this.selectedSliderControl.value ? this.selectedSliderControl.value : null
    }

    if (rowType === 'banner') {
      newRowData.resolve = this.selectedBannerControl.value ? this.selectedBannerControl.value : null
    }

    if (rowType === 'section') {
      const sectionType = this.sectionTypeControl.value
      let sectionData = {
        title: this.sectionNameControl.value,
        type: sectionType
      }

      if (sectionType === 'product') {
        sectionData["value"] = this.selectedCategoryControl.value
      }

      newRowData.resolve = sectionData;
    }

    this.templateContent.push(newRowData);
    console.log(this.templateContent)
  }

  moveUp(row: any): void {
    const previousRow: any = _.find(this.templateContent, ['row_number', row.row_number - 1]);
    if (previousRow) {
      this.swapOrder(row, previousRow);
    }
  }

  moveDown(row: any): void {
    const nextRow: any = _.find(this.templateContent, ['row_number', row.row_number + 1]);
    if (nextRow) {
      this.swapOrder(row, nextRow);
    }
  }

  deleteRow(row: any): void {
    const newList: any = _.filter(this.templateContent, 
      (o) => o.row_number !== row.row_number);
    const reArrangedList = [];

    let i = 0;
    while (i < newList.length) {
      const newRow = newList[i];
      newRow.row_number = i + 1;
      reArrangedList.push(newRow);
      i++;
    }

    this.templateContent = [];
    this.templateContent = _.orderBy(reArrangedList, ['row_number'], ['asc']);
  }

  private swapOrder(curr: any, prev: any): void {
    const newList: any[] = _.filter(this.templateContent, 
      (o) => o.row_number !== curr.row_number && o.row_number !== prev.row_number);
    
    const cat_order = curr.row_number;
    curr.row_number = prev.row_number;
    prev.row_number = cat_order;
    newList.push(curr);
    newList.push(prev);

    this.templateContent = [];
    this.templateContent = _.orderBy(newList, ['row_number'], ['asc']);
  }
}
