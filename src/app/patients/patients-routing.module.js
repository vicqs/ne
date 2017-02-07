"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var patient_list_component_1 = require("./patient-list/patient-list.component");
var patient_component_1 = require("./patient/patient.component");
var patients_component_1 = require("./patients.component");
var core_2 = require("../core");
var routes = [
    {
        path: '',
        component: patients_component_1.PatientsComponent,
        children: [
            {
                path: '',
                component: patient_list_component_1.PatientListComponent,
            },
            {
                path: ':id',
                component: patient_component_1.PatientComponent,
                canDeactivate: [core_2.CanDeactivateGuard]
            },
        ]
    },
];
var PatientsRoutingModule = (function () {
    function PatientsRoutingModule() {
    }
    return PatientsRoutingModule;
}());
PatientsRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule],
    })
], PatientsRoutingModule);
exports.PatientsRoutingModule = PatientsRoutingModule;
exports.routedComponents = [patients_component_1.PatientsComponent, patient_list_component_1.PatientListComponent, patient_component_1.PatientComponent];
//# sourceMappingURL=patients-routing.module.js.map