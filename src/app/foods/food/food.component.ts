import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { CanComponentDeactivate, EntityService, ModalService, ToastService } from '../../core';
import { Food } from '../shared/food.model';
import { FoodService } from '../shared/food.service';

@Component({
  moduleId: module.id,
  selector: 'ne-food',
   templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnDestroy, OnInit, CanComponentDeactivate {
  @Input() food: Food;
  editFood: Food = <Food>{};

  private dbResetSubscription: Subscription;
  private id: any;

  constructor(private entityService: EntityService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private foodService: FoodService,
    private toastService: ToastService) { }

  cancel(showToast = true) {
    this.editFood = this.entityService.clone(this.food);
    if (showToast) {
      this.toastService.activate(`Cambios cancelados en ${this.food.name}`);
      this.gotoFoods();
    }
  }

  canDeactivate() {
    return !this.food ||
      !this.isDirty() ||
      this.modalService.activate();
  }

  delete() {
    let msg = `¿Quiere eliminar ${this.food.name}?`;
    this.modalService.activate(msg).then((responseOK) => {
      if (responseOK) {
        this.cancel(false);
        this.foodService.deleteFood(this.food)
          .subscribe(
          () => { // Success path
            this.toastService.activate(`Borrado ${this.food.name}`);
            this.gotoFoods();
          },
          (err) => this.handleServiceError('Delete', err), // Failure path
          () => console.log('Delete Completed') // Completed actions
          );
      }
    });
  }

  isAddMode() { return isNaN(this.id); }

  ngOnDestroy() {
    this.dbResetSubscription.unsubscribe();
  }

  ngOnInit() {
    componentHandler.upgradeDom();
    this.dbResetSubscription =
      this.foodService.onDbReset.subscribe(() => this.getFood());

    // ** Could use a snapshot here, as long as the parameters do not change.
    // ** This may happen when a component is re-used, such as fwd/back.
    // this.id = +this.route.snapshot.params['id'];
    //
    // ** We could use a subscription to get the parameter, too.
    // ** The ActivatedRoute gets unsubscribed
    // this.route
    //   .params
    //   .map(params => params['id'])
    //   .do(id => this.id = +id)
    //   .subscribe(id => this.getFood());
    //
    // ** Instead we will use a Resolve(r)
    this.route.data.subscribe((data: { food: Food }) => {
      this.setEditFood(data.food);
      this.id = this.food.id;
    });
  }

  save() {
    let food = this.food =
      this.entityService.merge(this.food, this.editFood);
    if (food.id == null) {
      this.foodService.addFood(food).subscribe(s => {
        this.setEditFood(s);
        this.toastService.activate(`Agregado ${s.name} exitosamente`);
        this.gotoFoods();
      });
      return;
    }
    this.foodService.updateFood(this.food)
      .subscribe(() => {
          this.toastService.activate(`Guardado ${this.food.name} exitosamente`);
          this.gotoFoods();
        });
  }

  private getFood() {
    if (this.id === 0) {
      return;
    };
    if (this.isAddMode()) {
      this.food = <Food>{ name: '', type: '' };
      this.editFood = this.entityService.clone(this.food);
      return;
    }
    this.foodService.getFood(this.id).subscribe(
      (food: Food) => this.setEditFood(food));
  }

  private gotoFoods() {
    this.router.navigate(['/foods']);
  }

  private handleServiceError(op: string, err: any) {
    console.error(`${op} error: ${err.message || err}`);
  }

  private isDirty() {
    return this.entityService.propertiesDiffer(this.food, this.editFood);
  }
  
  private setEditFood(food: Food) {
    if (food) {
      this.food = food;
      this.editFood = this.entityService.clone(this.food);
    } else {
      this.gotoFoods();
    }
  }
}