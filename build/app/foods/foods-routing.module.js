"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var food_list_component_1 = require("./food-list/food-list.component");
var food_component_1 = require("./food/food.component");
var foods_component_1 = require("./foods.component");
var food_resolver_service_1 = require("./shared/food-resolver.service");
var core_2 = require("../core");
var routes = [
    {
        path: '',
        component: foods_component_1.FoodsComponent,
        children: [
            {
                path: '',
                component: food_list_component_1.FoodListComponent,
            },
            {
                path: ':id',
                component: food_component_1.FoodComponent,
                canDeactivate: [core_2.CanDeactivateGuard],
                resolve: {
                    food: food_resolver_service_1.FoodResolver
                }
            },
        ]
    },
];
var FoodsRoutingModule = (function () {
    function FoodsRoutingModule() {
    }
    return FoodsRoutingModule;
}());
FoodsRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule],
        providers: [food_resolver_service_1.FoodResolver]
    })
], FoodsRoutingModule);
exports.FoodsRoutingModule = FoodsRoutingModule;
exports.routedComponents = [foods_component_1.FoodsComponent, food_list_component_1.FoodListComponent, food_component_1.FoodComponent];
//# sourceMappingURL=foods-routing.module.js.map