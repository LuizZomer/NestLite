import express, { Express, Request, Response, Router } from "express";
import { Container } from "./di-container";
import { MiddlewareConsumer } from "./middlewares/consumer";
import { NestLiteMiddleware } from "./middlewares/types";
import {
  BodyParamResolver,
  IParamResolver,
  QueryParamResolver,
  RequestResolver,
  ResponseResolver,
  RouteParamResolver,
} from "./strategies/params";
import { Constructor } from "./types";

export class Factory {
  private static readonly resolvers: IParamResolver[] = [
    new BodyParamResolver(),
    new RouteParamResolver(),
    new QueryParamResolver(),
    new ResponseResolver(),
    new RequestResolver(),
  ];

  public static create(rootModule: Constructor): Express {
    const app = express();
    app.use(express.json());
    this.registerModule(rootModule, app);

    app.use((_, res) => {
      res.status(404).json({ error: "Route not found" });
    });

    return app;
  }

  // === separa módulos recursivamente ===
  private static registerModule(moduleClass: Constructor, app: Express) {
    this.ensureIsModule(moduleClass);

    const moduleInstance = new moduleClass();

    if (typeof moduleInstance.configure === "function") {
      const consumer = new MiddlewareConsumer();
      moduleInstance.configure(consumer);

      const { middlewares, routes } = consumer.getConfig();
      middlewares.forEach((middleware: NestLiteMiddleware) => {
        if (routes.length > 0) {
          routes.forEach((route: string) =>
            app.use(route, middleware.use.bind(middleware))
          );
        } else {
          app.use(middleware.use.bind(middleware));
        }
      });
    }

    const imports: Constructor[] =
      Reflect.getMetadata("imports", moduleClass) || [];
    for (const importedModule of imports) {
      this.registerModule(importedModule, app);
    }

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
      this.registerRoute(
        controllerInstance,
        controllerInstance[methodName],
        methodName,
        router
      );
    }

    app.use(basePath, router);
  }

  // === registra rotas individuais ===
  private static registerRoute(
    controllerInstance: any,
    method: Function,
    methodName: string,
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
          const proto = Object.getPrototypeOf(controllerInstance);
          const args: any[] = [];

          for (let i = 0; i < method.length; i++) {
            const paramMetadata = Reflect.getMetadata(
              `param:${i}`,
              proto,
              methodName
            );

            if (paramMetadata) {
              const resolver = this.resolvers.find((r) =>
                r.supports(paramMetadata.type)
              );

              if (resolver) {
                args[i] = resolver.resolve(proto, i, paramMetadata, req);
              }
            } else {
              args[i] = undefined;
            }
          }

          const result = await method.apply(controllerInstance, args);

          if (!res.headersSent && result !== undefined) {
            res.json(result);
          }
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
