"use strict";
function throwIfAlreadyLoaded(parentModule, moduleName) {
    if (parentModule) {
        throw new Error(moduleName + " Ya se ha cargado. Importar el m\u00F3dulo Core s\u00F3lo en AppModule.");
    }
}
exports.throwIfAlreadyLoaded = throwIfAlreadyLoaded;
//# sourceMappingURL=module-import-guard.js.map