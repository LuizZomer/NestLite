import express, { Express, Request, Response, Router } from "express";
import { Container } from "./di-container";

export class Factory {
  public static create(rootModule: Constructor): Express {
    const app = express();
    this.registerModule(rootModule, app);
    return app;
  }

  // === separa módulos recursivamente ===
  private static registerModule(moduleClass: Constructor, app: Express) {
    this.ensureIsModule(moduleClass);

    // registra módulos importados primeiro
    const imports: Constructor[] =
      Reflect.getMetadata("imports", moduleClass) || [];
    for (const importedModule of imports) {
      this.registerModule(importedModule, app);
    }

    // registra controllers do módulo
    const controllers: Constructor[] =
      Reflect.getMetadata("controllers", moduleClass) || [];
    for (const ControllerClass of controllers) {
      this.registerController(ControllerClass, app, moduleClass);
    }
  }

  // === checa se a classe tem @Module ===
  private static ensureIsModule(moduleClass: Constructor) {
    if (!Reflect.getMetadata("isModule", moduleClass)) {
      throw new Error(
        `Module ${moduleClass.name} is missing @Module() decorator`
      );
    }
  }

  // === registra controllers e rotas ===
  private static registerController(
    ControllerClass: Constructor,
    app: Express,
    moduleClass: Constructor
  ) {
    const controllerInstance = this.createController(
      ControllerClass,
      moduleClass
    );
    const basePath: string = Reflect.getMetadata("path", ControllerClass) || "";
    const router: Router = express.Router();

    const proto = Object.getPrototypeOf(controllerInstance);
    const methodNames = Object.getOwnPropertyNames(proto).filter(
      (name) => name !== "constructor"
    );

    for (const methodName of methodNames) {
      this.registerRoute(controllerInstance, proto[methodName], router);
    }

    app.use(basePath, router);
  }

  // === registra rotas individuais ===
  private static registerRoute(
    controllerInstance: any,
    method: (...args: any[]) => Promise<any> | any,
    router: Router
  ) {
    const routePath: string | undefined = Reflect.getMetadata("path", method);
    const routeMethod: keyof Router | undefined = Reflect.getMetadata(
      "method",
      method
    );

    if (routePath && routeMethod) {
      // @ts-ignore
      router[routeMethod](routePath, async (req: Request, res: Response) => {
        try {
          const result = await method.call(controllerInstance, req, res);
          if (!res.headersSent && result !== undefined) res.json(result);
        } catch (err: any) {
          res
            .status(500)
            .json({ error: err.message || "Internal server error" });
        }
      });
    }
  }

  // === cria controller com injeção de dependências ===
  private static createController<T>(
    ControllerClass: Constructor<T>,
    moduleClass: Constructor
  ): T {
    const providers: Constructor[] =
      Reflect.getMetadata("providers", moduleClass) || [];
    const paramTypes: Constructor[] =
      Reflect.getMetadata("design:paramtypes", ControllerClass) || [];

    const dependencies = paramTypes.map((dep) => Container.get(dep, providers));

    return new ControllerClass(...dependencies);
  }
}
