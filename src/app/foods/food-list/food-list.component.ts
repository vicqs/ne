import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FilterTextComponent } from '../../shared/filter-text/filter-text.component';
import { FilterTextService } from '../../shared/filter-text/filter-text.service';
import { Food } from '../shared/food.model';
import { FoodService } from '../shared/food.service';

@Component({
  moduleId: module.id,
  selector: 'ne-food-list',
   templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnDestroy, OnInit {
  private dbResetSubscription: Subscription;

  foods: Food[];
  filteredFoods = this.foods;
  @ViewChild(FilterTextComponent) filterComponent: FilterTextComponent;

  constructor(
    private filterService: FilterTextService,
    private foodService: FoodService) { }

  filterChanged(searchText: string) {
    this.filteredFoods = this.filterService.filter(searchText, ['id', 'name', 'type'], this.foods);
  }

  getFoods() {
    this.foods = [];
    this.foodService.getFoods()
      .subscribe(foods => {
        this.foods = this.filteredFoods = foods;
        this.filterComponent.clear();
      },
      error => {
        console.log('error occurred here');
        console.log(error);
      },
       () => {
        console.log('food retrieval completed');
      });
  }

  ngOnDestroy() {
    this.dbResetSubscription.unsubscribe();
  }

  ngOnInit() {
    componentHandler.upgradeDom();
    this.getFoods();
    this.dbResetSubscription = this.foodService.onDbReset
      .subscribe(() => this.getFoods());
  }

  trackByFoods(index: number, food: Food) {
    return food.id;
  }
}
