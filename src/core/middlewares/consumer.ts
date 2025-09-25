import { NestLiteMiddleware } from "./types";

export class MiddlewareConsumer {
  private middlewares: NestLiteMiddleware[] = [];
  private routes: string[] = [];

  public apply(...middlewares: { new (): NestLiteMiddleware }[]) {
    this.middlewares.push(...middlewares.map((Middleware) => new Middleware()));
    return this;
  }

  public forRoutes(...routes: string[]) {
    this.routes.push(...routes);
    return this;
  }

  public getConfig() {
    return {
      middlewares: this.middlewares,
      routes: this.routes,
    };
  }
}
