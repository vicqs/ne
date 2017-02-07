import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Food } from './food.model';
import { CONFIG, ExceptionService, MessageService, SpinnerService } from '../../core';

let foodsUrl = CONFIG.baseUrls.foods;

@Injectable()
export class FoodService {
  onDbReset = this.messageService.state;

  constructor(private http: Http,
    private exceptionService: ExceptionService,
    private messageService: MessageService,
    private spinnerService: SpinnerService) {
    this.messageService.state.subscribe(state => this.getFoods());
  }

  addFood(food: Food) {
    let body = JSON.stringify(food);
    this.spinnerService.show();
    return <Observable<Food>>this.http
      .post(`${foodsUrl}`, body)
      .map(res => <Food>res.json().data)
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }

  deleteFood(food: Food) {
    this.spinnerService.show();
    return <Observable<Food>>this.http
      .delete(`${foodsUrl}/${food.id}`)
      .map(res => this.extractData<Food>(res))
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }

  getFoods() {
    this.spinnerService.show();
    return <Observable<Food[]>>this.http
      .get(foodsUrl)
      .map(res => this.extractData<Food[]>(res))
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }

  private extractData<T>(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json ? res.json() : null;
    return <T>(body && body.data || {});
  }

  getFood(id: number) {
    this.spinnerService.show();
    return <Observable<Food>>this.http
      .get(`${foodsUrl}/${id}`)
      .map(res => this.extractData<Food>(res))
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }

  updateFood(food: Food) {
    let body = JSON.stringify(food);
    this.spinnerService.show();

    return <Observable<Food>>this.http
      .put(`${foodsUrl}/${food.id}`, body)
      .map(res => this.extractData<Food>(res))
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }
}
