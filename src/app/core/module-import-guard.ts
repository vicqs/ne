export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} Ya se ha cargado. Importar el módulo Core sólo en AppModule.`);
  }
}
