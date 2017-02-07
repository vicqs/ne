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
var http_1 = require("@angular/http");
var core_2 = require("../../core");
var foodsUrl = core_2.CONFIG.baseUrls.foods;
var FoodService = (function () {
    function FoodService(http, exceptionService, messageService, spinnerService) {
        var _this = this;
        this.http = http;
        this.exceptionService = exceptionService;
        this.messageService = messageService;
        this.spinnerService = spinnerService;
        this.onDbReset = this.messageService.state;
        this.messageService.state.subscribe(function (state) { return _this.getFoods(); });
    }
    FoodService.prototype.addFood = function (food) {
        var _this = this;
        var body = JSON.stringify(food);
        this.spinnerService.show();
        return this.http
            .post("" + foodsUrl, body)
            .map(function (res) { return res.json().data; })
            .catch(this.exceptionService.catchBadResponse)
            .finally(function () { return _this.spinnerService.hide(); });
    };
    FoodService.prototype.deleteFood = function (food) {
        var _this = this;
        this.spinnerService.show();
        return this.http
            .delete(foodsUrl + "/" + food.id)
            .map(function (res) { return _this.extractData(res); })
            .catch(this.exceptionService.catchBadResponse)
            .finally(function () { return _this.spinnerService.hide(); });
    };
    FoodService.prototype.getFoods = function () {
        var _this = this;
        this.spinnerService.show();
        return this.http
            .get(foodsUrl)
            .map(function (res) { return _this.extractData(res); })
            .catch(this.exceptionService.catchBadResponse)
            .finally(function () { return _this.spinnerService.hide(); });
    };
    FoodService.prototype.extractData = function (res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        var body = res.json ? res.json() : null;
        return (body && body.data || {});
    };
    FoodService.prototype.getFood = function (id) {
        var _this = this;
        this.spinnerService.show();
        return this.http
            .get(foodsUrl + "/" + id)
            .map(function (res) { return _this.extractData(res); })
            .catch(this.exceptionService.catchBadResponse)
            .finally(function () { return _this.spinnerService.hide(); });
    };
    FoodService.prototype.updateFood = function (food) {
        var _this = this;
        var body = JSON.stringify(food);
        this.spinnerService.show();
        return this.http
            .put(foodsUrl + "/" + food.id, body)
            .map(function (res) { return _this.extractData(res); })
            .catch(this.exceptionService.catchBadResponse)
            .finally(function () { return _this.spinnerService.hide(); });
    };
    return FoodService;
}());
FoodService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        core_2.ExceptionService,
        core_2.MessageService,
        core_2.SpinnerService])
], FoodService);
exports.FoodService = FoodService;
//# sourceMappingURL=food.service.js.map