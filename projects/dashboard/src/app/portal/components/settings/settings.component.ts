import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  disableAddBtn: boolean = false;
  buttonText: string = "Save";
  imageUrl: string | any = "./assets/images/product-placeholder.png";

  settingsForm = new FormGroup({
    shopName: new FormControl("", Validators.required),
    shopUrl: new FormControl("", Validators.required),
    shopIpAddress: new FormControl("", Validators.required),
    shopDescription: new FormControl("", Validators.required),
    shopLogo: new FormControl("", Validators.required),
  });

  constructor(private authService: AuthService) { 
    authService.getShopInfo();
  }

  ngOnInit() {
    this.authService.getShopInfoObservable().subscribe((response) => {
      console.log(response)
      const siteInfo = response;
      this.shopNameControl.setValue(siteInfo.name);
      this.shopUrlControl.setValue(siteInfo.url);
      this.shopIpAddressControl.setValue(siteInfo.ipAddress);
      this.shopDescriptionControl.setValue(siteInfo.description);
      this.shopLogoControl.setValue(siteInfo.logo);
      this.imageUrl = 'https://bincommerzstaticstorage.blob.core.windows.net' + siteInfo.logo;
    })
  }

  get shopNameControl(): AbstractControl {
    return this.settingsForm.get("shopName");
  }

  get shopUrlControl(): AbstractControl {
    return this.settingsForm.get("shopUrl");
  }

  get shopIpAddressControl(): AbstractControl {
    return this.settingsForm.get("shopIpAddress");
  }

  get shopDescriptionControl(): AbstractControl {
    return this.settingsForm.get("shopDescription");
  }

  get shopLogoControl(): AbstractControl {
    return this.settingsForm.get("shopLogo");
  }

  handleFileInput(file: File): void {
    if(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        const imageData: string = reader.result as string;
        this.imageUrl = imageData;
        this.shopLogoControl.setValue(imageData.split(",")[1]);
      };
    }
  }

}
