import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Catagory } from '../../interfaces/catagory';
import { CatagoriesDataService } from '../../services/catagories-data.service';
import { CatagoriesListService } from '../../services/catagories-list.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  tableData = new BehaviorSubject<Catagory[]>([]);

  constructor(
    public catagoriesListService: CatagoriesListService,
    public catagoriesDataService: CatagoriesDataService
  ) {}

  ngOnInit() {}

}
