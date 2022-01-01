import { Component, OnInit } from '@angular/core';
import { TemplateDataService } from '../../services/template-data.service';
import { TemplateListService } from '../../services/template-list.service';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnInit {

  constructor(
    public templateListService: TemplateListService,
    public templatesDataService: TemplateDataService
  ) {}

  ngOnInit() {
    this.templatesDataService.templates$.subscribe((v) => console.log(v))
  }

}
