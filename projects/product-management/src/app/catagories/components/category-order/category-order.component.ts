import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Catagory } from '../../interfaces/catagory';
import { CatagoriesDataService } from '../../services/catagories-data.service';
import { CatagoriesListService } from '../../services/catagories-list.service';
import * as _ from 'lodash';
import { first, take } from 'rxjs/operators';

@Component({
  selector: 'app-category-order',
  templateUrl: './category-order.component.html',
  styleUrls: ['./category-order.component.scss']
})
export class CategoryOrderComponent implements OnInit {
  public categories: Catagory[] = [];

  constructor(
    public catagoriesListService: CatagoriesListService,
    public catagoriesDataService: CatagoriesDataService
  ) {}

  ngOnInit() {
    this.categories = [];
    this.catagoriesDataService.getAllCatagories().subscribe();
    this.catagoriesDataService.catagories.subscribe((catList) => {
      let i = 1;
      catList.forEach((cat) => {
        cat.order = i;
        const existingCategory: Catagory = _.find(this.categories, ['id', cat.id]);
        if (!existingCategory) {
          this.categories.push(cat);
        }
        i++;
      });

      this.categories = _.orderBy(this.categories, ['order'], ['asc']);
    });
  }

  moveUp(category: Catagory): void {
    const previousCategory: Catagory = _.find(this.categories, ['order', category.order - 1]);
    this.swapOrder(category, previousCategory);
  }

  moveDown(category: Catagory): void {
    const nextCategory: Catagory = _.find(this.categories, ['order', category.order + 1]);
    this.swapOrder(category, nextCategory);
  }

  saveOrders(): void {
    const payload: {id: string, order: number}[] = [];

    this.categories.forEach((cat) => {
      payload.push({ id: cat.id, order: cat.order});
    })

    this.catagoriesDataService.saveCategoryOrder(payload).subscribe();
  }

  private swapOrder(curr: Catagory, prev: Catagory): void {
    const newList: Catagory[] = _.filter(this.categories, (o) => o.id !== curr.id && o.id !== prev.id);
    const cat_order = curr.order;
    curr.order = prev.order;
    prev.order = cat_order;
    newList.push(curr);
    newList.push(prev);

    this.categories = [];
    this.categories = _.orderBy(newList, ['order'], ['asc']);
  }
}
