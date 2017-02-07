import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Food } from './food.model';
import { FoodService } from './food.service';

@Injectable()
export class FoodResolver implements Resolve<Food> {
  constructor(
    private foodService: FoodService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let id = +route.params['id'];
    return this.foodService.getFood(id)
      .map(food => {
        if (food) {
          return food;
        }
        // Return a new object, because we're going to create a new one
        return new Food();
        // We could throw an error here and catch it
        // and route back to the speaker list
        // let msg = `food id ${id} not found`;
        // console.log(msg);
        // throw new Error(msg)
      })
      .catch((error: any) => {
        console.log(`${error}. Heading back to food list`);
        this.router.navigate(['/foods']);
        return Observable.of(null);
      });
  }
}
