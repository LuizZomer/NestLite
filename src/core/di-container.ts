export class Container {
  private static instances = new Map<Constructor, any>();

  static get<T>(target: Constructor<T>): T {
    if (!Reflect.getMetadata("isInjectable", target)) {
      throw new Error(
        `Cannot inject ${target.name}. Did you forget @Injectable()?`
      );
    }

    if (this.instances.has(target)) {
      return this.instances.get(target);
    }

    const paramTypes: Constructor[] =
      Reflect.getMetadata("design:paramtypes", target) || [];
    const dependencies = paramTypes.map((dep) => Container.get(dep));
    const instance = new target(...dependencies);

    this.instances.set(target, instance);
    return instance;
  }
}
