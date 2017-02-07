"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var food_button_component_1 = require("./shared/food-button/food-button.component");
var foods_routing_module_1 = require("./foods-routing.module");
var shared_module_1 = require("../shared/shared.module");
var food_service_1 = require("./shared/food.service");
var FoodsModule = (function () {
    function FoodsModule() {
    }
    return FoodsModule;
}());
FoodsModule = __decorate([
    core_1.NgModule({
        imports: [shared_module_1.SharedModule, foods_routing_module_1.FoodsRoutingModule],
        declarations: [food_button_component_1.FoodButtonComponent, foods_routing_module_1.routedComponents],
        providers: [food_service_1.FoodService]
    })
], FoodsModule);
exports.FoodsModule = FoodsModule;
// avoids having to lazy load with loadChildren: "app/foods/food.module#FoodModule"
//# sourceMappingURL=foods.module.js.map