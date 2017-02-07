"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var patient_button_component_1 = require("./shared/patient-button/patient-button.component");
var sort_patients_pipe_1 = require("./shared/sort-patients.pipe");
var patients_routing_module_1 = require("./patients-routing.module");
var shared_module_1 = require("../shared/shared.module");
var grid_list_1 = require("@angular2-material/grid-list");
var core_2 = require("@angular2-material/core");
var PatientsModule = (function () {
    function PatientsModule() {
    }
    return PatientsModule;
}());
PatientsModule = __decorate([
    core_1.NgModule({
        imports: [patients_routing_module_1.PatientsRoutingModule, shared_module_1.SharedModule, core_2.MdCoreModule, grid_list_1.MdGridListModule],
        declarations: [patient_button_component_1.patientButtonComponent, sort_patients_pipe_1.SortPatientsPipe, patients_routing_module_1.routedComponents]
    })
], PatientsModule);
exports.PatientsModule = PatientsModule;
//# sourceMappingURL=patients.module.js.map