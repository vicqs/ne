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
var core_2 = require("../../core");
var food_model_1 = require("../shared/food.model");
var food_service_1 = require("../shared/food.service");
var FoodComponent = (function () {
    function FoodComponent(entityService, modalService, route, router, foodService, toastService) {
        this.entityService = entityService;
        this.modalService = modalService;
        this.route = route;
        this.router = router;
        this.foodService = foodService;
        this.toastService = toastService;
        this.editFood = {};
    }
    FoodComponent.prototype.cancel = function (showToast) {
        if (showToast === void 0) { showToast = true; }
        this.editFood = this.entityService.clone(this.food);
        if (showToast) {
            this.toastService.activate("Cambios cancelados en " + this.food.name);
            this.gotoFoods();
        }
    };
    FoodComponent.prototype.canDeactivate = function () {
        return !this.food ||
            !this.isDirty() ||
            this.modalService.activate();
    };
    FoodComponent.prototype.delete = function () {
        var _this = this;
        var msg = "\u00BFQuiere eliminar " + this.food.name + "?";
        this.modalService.activate(msg).then(function (responseOK) {
            if (responseOK) {
                _this.cancel(false);
                _this.foodService.deleteFood(_this.food)
                    .subscribe(function () {
                    _this.toastService.activate("Borrado " + _this.food.name);
                    _this.gotoFoods();
                }, function (err) { return _this.handleServiceError('Delete', err); }, // Failure path
                function () { return console.log('Delete Completed'); } // Completed actions
                );
            }
        });
    };
    FoodComponent.prototype.isAddMode = function () { return isNaN(this.id); };
    FoodComponent.prototype.ngOnDestroy = function () {
        this.dbResetSubscription.unsubscribe();
    };
    FoodComponent.prototype.ngOnInit = function () {
        var _this = this;
        componentHandler.upgradeDom();
        this.dbResetSubscription =
            this.foodService.onDbReset.subscribe(function () { return _this.getFood(); });
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
        this.route.data.subscribe(function (data) {
            _this.setEditFood(data.food);
            _this.id = _this.food.id;
        });
    };
    FoodComponent.prototype.save = function () {
        var _this = this;
        var food = this.food =
            this.entityService.merge(this.food, this.editFood);
        if (food.id == null) {
            this.foodService.addFood(food).subscribe(function (s) {
                _this.setEditFood(s);
                _this.toastService.activate("Agregado " + s.name + " exitosamente");
                _this.gotoFoods();
            });
            return;
        }
        this.foodService.updateFood(this.food)
            .subscribe(function () {
            _this.toastService.activate("Guardado " + _this.food.name + " exitosamente");
            _this.gotoFoods();
        });
    };
    FoodComponent.prototype.getFood = function () {
        var _this = this;
        if (this.id === 0) {
            return;
        }
        ;
        if (this.isAddMode()) {
            this.food = { name: '', type: '' };
            this.editFood = this.entityService.clone(this.food);
            return;
        }
        this.foodService.getFood(this.id).subscribe(function (food) { return _this.setEditFood(food); });
    };
    FoodComponent.prototype.gotoFoods = function () {
        this.router.navigate(['/foods']);
    };
    FoodComponent.prototype.handleServiceError = function (op, err) {
        console.error(op + " error: " + (err.message || err));
    };
    FoodComponent.prototype.isDirty = function () {
        return this.entityService.propertiesDiffer(this.food, this.editFood);
    };
    FoodComponent.prototype.setEditFood = function (food) {
        if (food) {
            this.food = food;
            this.editFood = this.entityService.clone(this.food);
        }
        else {
            this.gotoFoods();
        }
    };
    return FoodComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", food_model_1.Food)
], FoodComponent.prototype, "food", void 0);
FoodComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ne-food',
        templateUrl: './food.component.html',
        styleUrls: ['./food.component.css']
    }),
    __metadata("design:paramtypes", [core_2.EntityService,
        core_2.ModalService,
        router_1.ActivatedRoute,
        router_1.Router,
        food_service_1.FoodService,
        core_2.ToastService])
], FoodComponent);
exports.FoodComponent = FoodComponent;
//# sourceMappingURL=food.component.js.map