import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodListComponent } from './food-list/food-list.component';
import { FoodComponent } from './food/food.component';
import { FoodsComponent } from './foods.component';
import { FoodResolver } from './shared/food-resolver.service';
import { CanDeactivateGuard } from '../core';

const routes: Routes = [
  {
    path: '',
    component: FoodsComponent,
    children: [
      {
        path: '',
        component: FoodListComponent,
      },
      {
        path: ':id',
        component: FoodComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          food: FoodResolver
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [FoodResolver]
})
export class FoodsRoutingModule { }

export const routedComponents = [FoodsComponent, FoodListComponent, FoodComponent];
