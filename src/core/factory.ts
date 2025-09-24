import express, { Express, Request, Response, Router } from "express";
import { Container } from "./di-container";

export class Factory {
  public static create(rootModule: Constructor): Express {
    const app = express();
    this.registerModule(rootModule, app);
    return app;
  }

  private static registerModule(moduleClass: Constructor, app: Express) {
    const controllers: Constructor[] =
      Reflect.getMetadata("controllers", moduleClass) || [];
    const imports: Constructor[] =
      Reflect.getMetadata("imports", moduleClass) || [];

    // Registra módulos importados recursivamente
    for (const importedModule of imports) {
      this.registerModule(importedModule, app);
    }

    for (const ControllerClass of controllers) {
      const controllerInstance = this.createController(ControllerClass);

      const basePath: string =
        Reflect.getMetadata("path", ControllerClass) || "";
      const router = express.Router();

      const proto = Object.getPrototypeOf(controllerInstance);
      for (const methodName of Object.getOwnPropertyNames(proto)) {
        if (methodName === "constructor") continue;

        const method = proto[methodName] as Function;
        const routePath: string | undefined = Reflect.getMetadata(
          "path",
          method
        );
        const routeMethod: keyof Router | undefined = Reflect.getMetadata(
          "method",
          method
        );

        if (routePath && routeMethod) {
          // @ts-ignore
          router[routeMethod](
            routePath,
            async (req: Request, res: Response) => {
              try {
                const result = await method.call(controllerInstance, req, res);
                if (!res.headersSent && result !== undefined) res.json(result);
              } catch (err: any) {
                res
                  .status(500)
                  .json({ error: err.message || "Internal server error" });
              }
            }
          );
        }
      }

      app.use(basePath, router);
    }
  }

  private static createController<T>(ControllerClass: Constructor<T>): T {
    const paramTypes: Constructor[] =
      Reflect.getMetadata("design:paramtypes", ControllerClass) || [];
    const dependencies = paramTypes.map((dep) => Container.get(dep));
    return new ControllerClass(...dependencies);
  }
}
