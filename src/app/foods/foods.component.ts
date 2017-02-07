import { Component } from '@angular/core';

import { FoodService } from './shared/food.service';

@Component({
  // selector: 'ne-foods',
  template: `<router-outlet></router-outlet>`,
  providers: [FoodService]
})
export class FoodsComponent  {}
