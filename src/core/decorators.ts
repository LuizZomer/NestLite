export const Injectable = (): ClassDecorator => {
  return <TFunction extends Function>(target: TFunction) => {
    Reflect.defineMetadata("isInjectable", true, target);
  };
};

export const Module = (metadata: ModuleMetadata = {}): ClassDecorator => {
  return <TFunction extends Function>(target: TFunction) => {
    Reflect.defineMetadata("isModule", true, target);
    Reflect.defineMetadata("controllers", metadata.controllers || [], target);
    Reflect.defineMetadata("imports", metadata.imports || [], target);
  };
};

export const Controller = (path: string): ClassDecorator => {
  return <TFunction extends Function>(target: TFunction) => {
    Reflect.defineMetadata("path", path, target);
  };
};

export const Get = (path: string): MethodDecorator => {
  return (_target, _propertyKey, descriptor: PropertyDescriptor) => {
    if (descriptor.value) {
      Reflect.defineMetadata("path", path, descriptor.value);
      Reflect.defineMetadata("method", "get", descriptor.value);
    }
  };
};
