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
    Reflect.defineMetadata("providers", metadata.providers || [], target);
  };
};

export const Controller = (path: string): ClassDecorator => {
  return <TFunction extends Function>(target: TFunction) => {
    Reflect.defineMetadata("path", path, target);
  };
};

export const Get = (path: string = "/"): MethodDecorator => {
  return (_target, _propertyKey, descriptor: PropertyDescriptor) => {
    if (descriptor.value) {
      Reflect.defineMetadata("path", path, descriptor.value);
      Reflect.defineMetadata("method", "get", descriptor.value);
    }
  };
};

export const Post = (path: string = "/"): MethodDecorator => {
  return (_target, _propertyKey, descriptor: PropertyDescriptor) => {
    if (descriptor.value) {
      Reflect.defineMetadata("path", path, descriptor.value);
      Reflect.defineMetadata("method", "post", descriptor.value);
    }
  };
};

export const Put = (path: string = "/"): MethodDecorator => {
  return (_target, _propertyKey, descriptor: PropertyDescriptor) => {
    if (descriptor.value) {
      Reflect.defineMetadata("path", path, descriptor.value);
      Reflect.defineMetadata("method", "put", descriptor.value);
    }
  };
};

export const Delete = (path: string = "/"): MethodDecorator => {
  return (_target, _propertyKey, descriptor: PropertyDescriptor) => {
    if (descriptor.value) {
      Reflect.defineMetadata("path", path, descriptor.value);
      Reflect.defineMetadata("method", "delete", descriptor.value);
    }
  };
};

export const Body = (): ParameterDecorator => {
  return (target, propertyKey, parameterIndex) => {
    if (!propertyKey) throw new Error("@Body cannot be used on constructors");

    const bodyParams: number[] =
      Reflect.getMetadata("body_params", target, propertyKey) || [];
    bodyParams.push(parameterIndex);
    Reflect.defineMetadata("body_params", bodyParams, target, propertyKey);
  };
};
