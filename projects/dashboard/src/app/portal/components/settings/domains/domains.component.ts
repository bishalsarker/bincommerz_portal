import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Page } from 'projects/content-management/src/app/pages/interfaces/Page';
import { ITableColumn, ITableColumnAction } from 'projects/dashboard/src/app/shared/interfaces/data-table';
import { AuthService } from 'projects/dashboard/src/app/shared/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { SettingsDataService } from '../../../services/settings-data.service';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss']
})
export class DomainsComponent implements OnInit {
  appUrl: string = null;
  domains$: BehaviorSubject<{ id: string, domain: string, DNSTarget: string }[]> = new BehaviorSubject([]);
  domainTableColumnConfig = new BehaviorSubject<ITableColumn[]>([
    {
      columnName: "Domain",
      propertyName: "domain",
    },
    {
      columnName: "DNS Target",
      propertyName: "DNSTarget",
    }
  ]);

  domainTableActions = new BehaviorSubject<ITableColumnAction[]>([
    {
      icon: "",
      title: "Delete",
      showActions: () => true,
      predicate: (item: any) => true,
      do: (item: Page) => {
        if(confirm("Are you sure?")) {
          this.settingsDataService.deleteDomainRecord(item.id).subscribe();
        }
      },
    },
  ]);

  constructor(
    private authService: AuthService, 
    private settingsDataService: SettingsDataService) { 
    authService.getShopInfo();
  }

  domainForm = new FormGroup({
    domainName: new FormControl("", Validators.required)
  });

  ngOnInit() {
    this.getAllDomains();
  }

  getAllDomains(): void {
    this.settingsDataService.getShopDomains().subscribe((urls) => {
      this.appUrl = urls.appUrl;
      this.domains$.next(urls.domains.map((domain) => {
        return {
          id: domain.id, domain: domain.url, DNSTarget: domain.dnsTarget
        }
      }));
    });
  }

  addAppUrl(): void {
    this.settingsDataService.addAppURL().subscribe();
  }

  addDomainUrl(): void {
    const domainPattern = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;

    if (this.domainNameControl.value.match(domainPattern)) {
      this.settingsDataService.addDomainURL({ url: this.domainNameControl.value }).subscribe(() => this.getAllDomains());
    } else {
      alert('Invalid domain format')
    }
    
  }

  get domainNameControl(): AbstractControl {
    return this.domainForm.get('domainName');
  }

}
