export const Injectable = (): ClassDecorator => {
  return <TFunction extends Function>(target: TFunction) => {
    Reflect.defineMetadata("isInjectable", true, target);
  };
};
