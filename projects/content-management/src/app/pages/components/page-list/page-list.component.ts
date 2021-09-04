import { Component, OnInit } from '@angular/core';
import { PageListService } from '../../services/page-list.service';
import { PagesDataService } from '../../services/pages-data.service';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {

  constructor(
    public pageListService: PageListService,
    public pagesDataService: PagesDataService
  ) {}

  ngOnInit() {
    this.pagesDataService.pages$.subscribe((v) => console.log(v))
  }

}
