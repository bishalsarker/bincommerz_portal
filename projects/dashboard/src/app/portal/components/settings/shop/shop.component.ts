import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'projects/dashboard/src/app/shared/services/auth.service';
import { LoaderService } from 'projects/dashboard/src/app/shared/services/loader.service';
import { SettingsDataService } from '../../../services/settings-data.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  disableAddBtn: boolean = false;
  buttonText: string = "Save";
  imageUrl: string | any = "./assets/images/product-placeholder.png";

  settingsForm = new FormGroup({
    shopName: new FormControl("", Validators.required),
    shopUrl: new FormControl("", Validators.required),
    shopIpAddress: new FormControl("", Validators.required),
    shopDescription: new FormControl("", Validators.required),
    shopLogo: new FormControl(""),
    reorderLevel: new FormControl("", [Validators.required, Validators.min(1)])
  });

  constructor(
    private authService: AuthService, 
    private settingsDataService: SettingsDataService,
    private loaderService: LoaderService) { 
    authService.getShopInfo();
  }

  ngOnInit() {
    this.loaderService.isLoading.next(true);
    this.authService.getShopInfoObservable().subscribe((response) => {
      console.log(response)
      const siteInfo = response;
      this.shopNameControl.setValue(siteInfo.name);
      this.shopUrlControl.setValue(siteInfo.url);
      this.shopIpAddressControl.setValue(siteInfo.ipAddress);
      this.shopDescriptionControl.setValue(siteInfo.description);
      this.imageUrl = 'https://bincommerzstaticstorage.blob.core.windows.net' + siteInfo.logo;
      this.reorderLevelControl.setValue(siteInfo.reorderLevel);
      this.loaderService.isLoading.next(false);
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

  get reorderLevelControl(): AbstractControl {
    return this.settingsForm.get("reorderLevel");
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

  updateSettings(): void {
    this.buttonText = "Saving...";
    this.disableAddBtn = true;

    this.settingsDataService.updateSettings({
      name: this.shopNameControl.value,
      description: this.shopDescriptionControl.value,
      logo: this.shopLogoControl.value,
      url: this.shopUrlControl.value,
      iPAddress: this.shopIpAddressControl.value,
      reorderLevel: this.reorderLevelControl.value
    }).subscribe(() => {}, () => {}, () => {
      this.buttonText = "Save";
      this.disableAddBtn = false;
    });
  }

}
