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
var _1 = require("../");
var MenuItem = (function () {
    function MenuItem(caption, link) {
        this.caption = caption;
        this.link = link;
    }
    return MenuItem;
}());
var NavComponent = (function () {
    function NavComponent(messageService, modalService) {
        this.messageService = messageService;
        this.modalService = modalService;
    }
    NavComponent.prototype.ngOnInit = function () {
        this.menuItems = [
            { caption: 'Dashboard', link: ['/dashboard'] },
            { caption: 'Pacientes', link: ['/patients'] },
            { caption: 'Alimentos', link: ['/foods'] },
            { caption: 'Perfil', link: ['/admin'] },
            { caption: 'Inicio Sesión', link: ['/login'] },
        ];
    };
    NavComponent.prototype.resetDb = function () {
        var _this = this;
        var msg = '¿Está seguro de que desea restablecer la base de datos?';
        this.modalService.activate(msg).then(function (responseOK) {
            if (responseOK) {
                _this.messageService.resetDb();
            }
        });
    };
    return NavComponent;
}());
NavComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ne-nav',
        templateUrl: './nav.component.html',
        styleUrls: ['./nav.component.css'],
    }),
    __metadata("design:paramtypes", [_1.MessageService,
        _1.ModalService])
], NavComponent);
exports.NavComponent = NavComponent;
//# sourceMappingURL=nav.component.js.map