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
var filter_text_component_1 = require("../../shared/filter-text/filter-text.component");
var filter_text_service_1 = require("../../shared/filter-text/filter-text.service");
var food_service_1 = require("../shared/food.service");
var FoodListComponent = (function () {
    function FoodListComponent(filterService, foodService) {
        this.filterService = filterService;
        this.foodService = foodService;
        this.filteredFoods = this.foods;
    }
    FoodListComponent.prototype.filterChanged = function (searchText) {
        this.filteredFoods = this.filterService.filter(searchText, ['id', 'name', 'type'], this.foods);
    };
    FoodListComponent.prototype.getFoods = function () {
        var _this = this;
        this.foods = [];
        this.foodService.getFoods()
            .subscribe(function (foods) {
            _this.foods = _this.filteredFoods = foods;
            _this.filterComponent.clear();
        }, function (error) {
            console.log('error occurred here');
            console.log(error);
        }, function () {
            console.log('food retrieval completed');
        });
    };
    FoodListComponent.prototype.ngOnDestroy = function () {
        this.dbResetSubscription.unsubscribe();
    };
    FoodListComponent.prototype.ngOnInit = function () {
        var _this = this;
        componentHandler.upgradeDom();
        this.getFoods();
        this.dbResetSubscription = this.foodService.onDbReset
            .subscribe(function () { return _this.getFoods(); });
    };
    FoodListComponent.prototype.trackByFoods = function (index, food) {
        return food.id;
    };
    return FoodListComponent;
}());
__decorate([
    core_1.ViewChild(filter_text_component_1.FilterTextComponent),
    __metadata("design:type", filter_text_component_1.FilterTextComponent)
], FoodListComponent.prototype, "filterComponent", void 0);
FoodListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ne-food-list',
        templateUrl: './food-list.component.html',
        styleUrls: ['./food-list.component.css']
    }),
    __metadata("design:paramtypes", [filter_text_service_1.FilterTextService,
        food_service_1.FoodService])
], FoodListComponent);
exports.FoodListComponent = FoodListComponent;
//# sourceMappingURL=food-list.component.js.map