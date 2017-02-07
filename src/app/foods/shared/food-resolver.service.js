"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var Observable_1 = require("rxjs/Observable");
var food_model_1 = require("./food.model");
var food_service_1 = require("./food.service");
var FoodResolver = (function () {
    function FoodResolver(foodService, router) {
        this.foodService = foodService;
        this.router = router;
    }
    FoodResolver.prototype.resolve = function (route, state) {
        var _this = this;
        var id = +route.params['id'];
        return this.foodService.getFood(id)
            .map(function (food) {
            if (food) {
                return food;
            }
            // Return a new object, because we're going to create a new one
            return new food_model_1.Food();
            // We could throw an error here and catch it
            // and route back to the speaker list
            // let msg = `food id ${id} not found`;
            // console.log(msg);
            // throw new Error(msg)
        })
            .catch(function (error) {
            console.log(error + ". Heading back to food list");
            _this.router.navigate(['/foods']);
            return Observable_1.Observable.of(null);
        });
    };
    return FoodResolver;
}());
FoodResolver = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [food_service_1.FoodService,
        router_1.Router])
], FoodResolver);
exports.FoodResolver = FoodResolver;
//# sourceMappingURL=food-resolver.service.js.map