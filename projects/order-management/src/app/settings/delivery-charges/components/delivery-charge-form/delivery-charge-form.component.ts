import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BreadcrumbService } from 'projects/order-management/src/app/shared/services/breadcrumb.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { DeliveryChargeDataService } from '../../services/delivery-charge-data.service';

@Component({
  selector: 'app-delivery-charge-form',
  templateUrl: './delivery-charge-form.component.html',
  styleUrls: ['./delivery-charge-form.component.scss']
})
export class DeliveryChargeFormComponent implements OnInit {
  deliveryChargeId = new BehaviorSubject<string>(null);
  loading$ = new BehaviorSubject<boolean>(false);
  disableAddBtn: boolean = false;
  buttonText: string = "Add";

  deliveryChargeForm = new FormGroup({
    title: new FormControl(""),
    amount: new FormControl("")
  });

  constructor(
    public breadCrumbService: BreadcrumbService,
    public deliveryChargeDataService: DeliveryChargeDataService,
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
        this.deliveryChargeId.next(templateid);
        this.getDeliveryChargeById();
      });
    }

    this.buttonText =  this.isEditMode ? "Update" : "Add";
  }

  ngOnDestroy(): void {
    this.breadCrumbService.removeLast();
  }

  getDeliveryChargeById(): void {
    this.deliveryChargeDataService.getDeliveryCharge(this.deliveryChargeId.value).subscribe((deliveryCharge) => {
      if (deliveryCharge) {
        this.titleControl.setValue(deliveryCharge.title);
        this.amountControl.setValue(deliveryCharge.amount);
      }
    });
  }

  get titleControl(): AbstractControl {
    return this.deliveryChargeForm.get("title");
  }

  get amountControl(): AbstractControl {
    return this.deliveryChargeForm.get("amount");
  }

  get isEditMode(): boolean {
    console.log(this.route.snapshot.data)
    return this.route.snapshot.data["editMode"];
  }

  addOrUpdateDeliveryCharge(): void {
    this.disableAddBtn = true;
    this.buttonText = "Saving...";

    const add: Observable<boolean> = this.isEditMode
      ? this.updateDeliveryCharge()
      : this.addDeliveryCharge();

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

  addDeliveryCharge(): Observable<boolean> {
    return this.deliveryChargeDataService.addDeliveryCharge({
      title: this.titleControl.value,
      amount: this.amountControl.value
    });
  }

  updateDeliveryCharge(): Observable<boolean> {
    return this.deliveryChargeDataService.updateDeliveryCharge({
      id: this.deliveryChargeId.value,
      title: this.titleControl.value,
      amount: this.amountControl.value
    });
  }
}
