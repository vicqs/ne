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
var core_2 = require("../core");
var patientsUrl = core_2.CONFIG.baseUrls.patients;
var PatientService = (function () {
    function PatientService(http, exceptionService, messageService, spinnerService) {
        var _this = this;
        this.http = http;
        this.exceptionService = exceptionService;
        this.messageService = messageService;
        this.spinnerService = spinnerService;
        this.onDbReset = this.messageService.state;
        this.messageService.state.subscribe(function (state) { return _this.getPatients(); });
    }
    PatientService.prototype.addpatient = function (patient) {
        var _this = this;
        var body = JSON.stringify(patient);
        this.spinnerService.show();
        return this.http
            .post("" + patientsUrl, body)
            .map(function (res) { return res.json().data; })
            .catch(this.exceptionService.catchBadResponse)
            .finally(function () { return _this.spinnerService.hide(); });
    };
    PatientService.prototype.deletepatient = function (patient) {
        var _this = this;
        this.spinnerService.show();
        return this.http
            .delete(patientsUrl + "/" + patient.id)
            .map(function (res) { return _this.extractData(res); })
            .catch(this.exceptionService.catchBadResponse)
            .finally(function () { return _this.spinnerService.hide(); });
    };
    PatientService.prototype.getPatients = function () {
        var _this = this;
        this.spinnerService.show();
        return this.http
            .get(patientsUrl)
            .map(function (res) { return _this.extractData(res); })
            .catch(this.exceptionService.catchBadResponse)
            .finally(function () { return _this.spinnerService.hide(); });
    };
    PatientService.prototype.getpatient = function (id) {
        var _this = this;
        this.spinnerService.show();
        return this.http
            .get(patientsUrl + "/" + id)
            .map(function (res) { return _this.extractData(res); })
            .catch(this.exceptionService.catchBadResponse)
            .finally(function () { return _this.spinnerService.hide(); });
    };
    PatientService.prototype.updatepatient = function (patient) {
        var _this = this;
        var body = JSON.stringify(patient);
        this.spinnerService.show();
        return this.http
            .put(patientsUrl + "/" + patient.id, body)
            .map(function (res) { return _this.extractData(res); })
            .catch(this.exceptionService.catchBadResponse)
            .finally(function () { return _this.spinnerService.hide(); });
    };
    PatientService.prototype.extractData = function (res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        var body = res.json ? res.json() : null;
        return (body && body.data || {});
    };
    return PatientService;
}());
PatientService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        core_2.ExceptionService,
        core_2.MessageService,
        core_2.SpinnerService])
], PatientService);
exports.PatientService = PatientService;
//# sourceMappingURL=patient.service.js.map