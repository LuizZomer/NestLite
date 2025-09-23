export const Module = (options: {
  controllers?: any[];
  imports?: any[];
}): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata("controllers", options?.controllers || [], target);
    Reflect.defineMetadata("imports", options?.imports || [], target);
  };
};

export const Injectable = (): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata("isInjectable", true, target);
  };
};

export const Controller = (path: string): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata("path", path, target);
  };
};

export const Get = (path: string): MethodDecorator => {
  return (_: any, __: string | symbol, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata("path", path, descriptor.value);
    Reflect.defineMetadata("method", "get", descriptor.value);
  };
};
