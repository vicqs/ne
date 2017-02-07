import { NgModule } from '@angular/core';

import { FoodButtonComponent } from './shared/food-button/food-button.component';

import { routedComponents, FoodsRoutingModule } from './foods-routing.module';

import { SharedModule } from '../shared/shared.module';
import { FoodService } from './shared/food.service'; 

@NgModule({
  imports: [SharedModule, FoodsRoutingModule],
  declarations: [FoodButtonComponent, routedComponents],
  providers: [FoodService]
})
export class FoodsModule { }
// avoids having to lazy load with loadChildren: "app/foods/food.module#FoodModule"
