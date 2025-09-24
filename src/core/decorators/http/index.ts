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
