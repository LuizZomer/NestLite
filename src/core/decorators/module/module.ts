export const Module = (metadata: ModuleMetadata = {}): ClassDecorator => {
  return <TFunction extends Function>(target: TFunction) => {
    Reflect.defineMetadata("isModule", true, target);
    Reflect.defineMetadata("controllers", metadata.controllers || [], target);
    Reflect.defineMetadata("imports", metadata.imports || [], target);
    Reflect.defineMetadata("providers", metadata.providers || [], target);
  };
};
