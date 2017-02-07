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
var models_1 = require("../../models");
var core_2 = require("../../core");
var PatientComponent = (function () {
    function PatientComponent(entityService, modalService, route, router, patientService, toastService) {
        this.entityService = entityService;
        this.modalService = modalService;
        this.route = route;
        this.router = router;
        this.patientService = patientService;
        this.toastService = toastService;
        this.editpatient = {};
    }
    PatientComponent.prototype.cancel = function (showToast) {
        if (showToast === void 0) { showToast = true; }
        this.editpatient = this.entityService.clone(this.patient);
        if (showToast) {
            this.toastService.activate("Cambios cancelados en " + this.patient.name);
            this.gotoPatients();
        }
    };
    PatientComponent.prototype.canDeactivate = function () {
        return !this.patient ||
            !this.isDirty() ||
            this.modalService.activate();
    };
    PatientComponent.prototype.delete = function () {
        var _this = this;
        var msg = "\u00BFQuiere eliminar " + this.patient.name + "?";
        this.modalService.activate(msg).then(function (responseOK) {
            if (responseOK) {
                _this.cancel(false);
                _this.patientService.deletepatient(_this.patient)
                    .subscribe(function () {
                    _this.toastService.activate("Borrado " + _this.patient.name);
                    _this.gotoPatients();
                }, function (err) { return _this.handleServiceError('Delete', err); }, // Failure path
                function () { return console.log('Delete Completed'); } // Completed actions
                );
            }
        });
    };
    PatientComponent.prototype.isAddMode = function () {
        return isNaN(this.id);
    };
    PatientComponent.prototype.ngOnDestroy = function () {
        this.dbResetSubscription.unsubscribe();
    };
    PatientComponent.prototype.ngOnInit = function () {
        var _this = this;
        componentHandler.upgradeDom();
        this.dbResetSubscription = this.patientService.onDbReset
            .subscribe(function () { return _this.getpatient(); });
        // Could use a snapshot here, as long as the parameters do not change.
        // This may happen when a component is re-used.
        // this.id = +this.route.snapshot.params['id'];
        this.route
            .params
            .map(function (params) { return params['id']; })
            .do(function (id) { return _this.id = +id; })
            .subscribe(function (id) { return _this.getpatient(); });
    };
    PatientComponent.prototype.save = function () {
        var _this = this;
        var patient = this.patient = this.entityService.merge(this.patient, this.editpatient);
        if (patient.id == null) {
            this.patientService.addpatient(patient)
                .subscribe(function (s) {
                _this.setEditpatient(s);
                _this.toastService.activate("Agregado " + s.name + " exitosamente");
                _this.gotoPatients();
            });
            return;
        }
        this.patientService.updatepatient(patient)
            .subscribe(function () {
            _this.toastService.activate("Guardado " + patient.name + " exitosamente");
            _this.gotoPatients(); //agregado
        });
    };
    PatientComponent.prototype.getpatient = function () {
        var _this = this;
        if (this.id === 0) {
            return;
        }
        ;
        if (this.isAddMode()) {
            this.patient = { name: '', side: '' };
            this.editpatient = this.entityService.clone(this.patient);
            return;
        }
        this.patientService.getpatient(this.id)
            .subscribe(function (patient) { return _this.setEditpatient(patient); });
    };
    PatientComponent.prototype.gotoPatients = function () {
        this.router.navigate(['/patients']);
    };
    PatientComponent.prototype.handleServiceError = function (op, err) {
        console.error(op + " error: " + (err.message || err));
    };
    PatientComponent.prototype.isDirty = function () {
        return this.entityService.propertiesDiffer(this.patient, this.editpatient);
    };
    PatientComponent.prototype.setEditpatient = function (patient) {
        if (patient) {
            this.patient = patient;
            this.editpatient = this.entityService.clone(this.patient);
        }
        else {
            this.gotoPatients();
        }
    };
    return PatientComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", models_1.Patient)
], PatientComponent.prototype, "patient", void 0);
PatientComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ne-patient',
        templateUrl: './patient.component.html',
        styleUrls: ['./patient.component.css']
    }),
    __metadata("design:paramtypes", [core_2.EntityService,
        core_2.ModalService,
        router_1.ActivatedRoute,
        router_1.Router,
        models_1.PatientService,
        core_2.ToastService])
], PatientComponent);
exports.PatientComponent = PatientComponent;
//# sourceMappingURL=patient.component.js.map