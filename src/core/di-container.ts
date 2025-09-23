import "reflect-metadata";

export class Container {
  private static instances = new Map();

  static get<T>(target: any): T {
    if (!Reflect.getMetadata("isInjectable", target)) {
      throw new Error(
        `Cannot inject ${target.name}. Did you forget to add @Injectable()?`
      );
    }

    if (this.instances.has(target)) {
      return this.instances.get(target);
    }

    const dependencies = this.getDependencies(target);
    const instance = new target(...dependencies);
    this.instances.set(target, instance);
    return instance;
  }

  private static getDependencies(target: any) {
    const deps: any[] = Reflect.getMetadata("design:paramtypes", target) || [];
    return deps.map((dep) => this.get(dep));
  }
}
