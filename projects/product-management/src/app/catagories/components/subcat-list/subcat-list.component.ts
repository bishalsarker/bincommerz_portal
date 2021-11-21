import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CatagoriesDataService } from '../../services/catagories-data.service';
import { CatagoriesListService } from '../../services/catagories-list.service';
import * as _ from 'lodash';
import { Catagory } from '../../interfaces/catagory';

@Component({
  selector: 'app-subcat-list',
  templateUrl: './subcat-list.component.html',
  styleUrls: ['./subcat-list.component.scss']
})
export class SubcatListComponent implements OnInit {
  categoryId = new BehaviorSubject<string>(null);

  constructor(
    private route: ActivatedRoute,
    public catagoriesListService: CatagoriesListService,
    public catagoriesDataService: CatagoriesDataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param: ParamMap) => {
      const catid: string = param["categoryid"];
      this.categoryId.next(catid);

      this.catagoriesDataService.getSubCatagories(catid).subscribe();
    });
  }

  get parentCategory(): Catagory {
    return this.catagoriesDataService.category.value;
  }

}
