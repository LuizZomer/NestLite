export const Controller = (path: string): ClassDecorator => {
  return <TFunction extends Function>(target: TFunction) => {
    Reflect.defineMetadata("path", path, target);
  };
};
