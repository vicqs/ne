import { Component, Input, OnInit } from '@angular/core';

import { Food } from '../food.model';

@Component({
  moduleId: module.id,
  selector: 'ne-food-button',
   templateUrl: './food-button.component.html',
  styleUrls: ['./food-button.component.css'],
})
export class FoodButtonComponent implements OnInit {
  @Input() food: Food;

  constructor() {}

  ngOnInit() {
  }

}
