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
var models_1 = require("../../models");
var filter_text_component_1 = require("../../shared/filter-text/filter-text.component");
var filter_text_service_1 = require("../../shared/filter-text/filter-text.service");
var PatientListComponent = (function () {
    function PatientListComponent(patientService, filterService) {
        this.patientService = patientService;
        this.filterService = filterService;
        this.patients = [];
        this.filteredPatients = this.patients;
    }
    PatientListComponent.prototype.filterChanged = function (searchText) {
        this.filteredPatients = this.filterService.filter(searchText, ['id', 'name', 'side'], this.patients);
    };
    PatientListComponent.prototype.getPatients = function () {
        var _this = this;
        this.patients = [];
        this.patientService.getPatients()
            .subscribe(function (patients) {
            _this.patients = _this.filteredPatients = patients;
            // this.filterComponent.clear();
        });
    };
    PatientListComponent.prototype.ngOnDestroy = function () {
        this.dbResetSubscription.unsubscribe();
    };
    PatientListComponent.prototype.ngOnInit = function () {
        var _this = this;
        componentHandler.upgradeDom();
        this.getPatients();
        this.dbResetSubscription = this.patientService.onDbReset
            .subscribe(function () { return _this.getPatients(); });
    };
    PatientListComponent.prototype.trackByPatients = function (index, patient) {
        return patient.id;
    };
    return PatientListComponent;
}());
__decorate([
    core_1.ViewChild(filter_text_component_1.FilterTextComponent),
    __metadata("design:type", filter_text_component_1.FilterTextComponent)
], PatientListComponent.prototype, "filterComponent", void 0);
PatientListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ne-patient-list',
        templateUrl: './patient-list.component.html',
        styleUrls: ['./patient-list.component.css'],
    }),
    __metadata("design:paramtypes", [models_1.PatientService,
        filter_text_service_1.FilterTextService])
], PatientListComponent);
exports.PatientListComponent = PatientListComponent;
//# sourceMappingURL=patient-list.component.js.map