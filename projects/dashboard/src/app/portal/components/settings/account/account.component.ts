import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'projects/dashboard/src/app/shared/services/auth.service';
import { SettingsDataService } from '../../../services/settings-data.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  disableAddBtn: boolean = false;
  buttonText: string = "Update Password";
  imageUrl: string | any = "./assets/images/product-placeholder.png";

  renewPasswordForm = new FormGroup({
    oldPassword: new FormControl("", Validators.required),
    newPassword: new FormControl("", Validators.required),
    retypePassword: new FormControl("", Validators.required),
  });

  constructor(
    private authService: AuthService, 
    private settingsDataService: SettingsDataService) { 
    authService.getShopInfo();
  }

  ngOnInit() {}

  get oldPasswordControl(): AbstractControl {
    return this.renewPasswordForm.get("oldPassword");
  }

  get newPasswordControl(): AbstractControl {
    return this.renewPasswordForm.get("newPassword");
  }

  get retypePasswordControl(): AbstractControl {
    return this.renewPasswordForm.get("retypePassword");
  }

  updatePassword(): void {
    this.buttonText = "Saving...";
    this.disableAddBtn = true;

    this.settingsDataService.updatePassword({
      oldPassword: this.oldPasswordControl.value,
      newPassword: this.newPasswordControl.value
    }).subscribe(() => {
      this.authService.signOut();
    }, () => {}, () => {
      this.buttonText = "Save";
      this.disableAddBtn = false;
    });
  }

}
