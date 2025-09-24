export class Container {
  private static instances = new Map<Constructor, any>();

  static get<T>(target: Constructor<T>, providers: Constructor[] = []): T {
    // Verifica se a classe está registrada como provider
    if (!providers.includes(target)) {
      throw new Error(
        `Cannot inject ${target.name}. Did you forget to register it in the module providers?`
      );
    }

    if (!Reflect.getMetadata("isInjectable", target)) {
      throw new Error(
        `Cannot inject ${target.name}. Did you forget @Injectable()?`
      );
    }

    if (this.instances.has(target)) return this.instances.get(target);

    const paramTypes: Constructor[] =
      Reflect.getMetadata("design:paramtypes", target) || [];
    const dependencies = paramTypes.map((dep) => this.get(dep, providers));

    const instance = new target(...dependencies);
    this.instances.set(target, instance);
    return instance;
  }
}
