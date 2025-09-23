import express, { Express, Request, Response } from "express";
import { Container } from "./di-container";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export class Factory {
  public static create(rootModule: any): Express {
    const app = express();

    function registerModule(moduleClass: any) {
      const controllers = Reflect.getMetadata("controllers", moduleClass) || [];
      const imports = Reflect.getMetadata("imports", moduleClass) || [];

      // processa controllers
      for (const ControllerClass of controllers) {
        const controllerInstance = new ControllerClass(
          ...Reflect.getMetadata("design:paramtypes", ControllerClass).map(
            (dep: any) => Container.get(dep)
          )
        );

        const basePath: string =
          Reflect.getMetadata("path", ControllerClass) || "";

        const router = express.Router();
        const proto = Object.getPrototypeOf(controllerInstance);

        for (const methodName of Object.getOwnPropertyNames(proto)) {
          if (methodName === "constructor") continue;
          const method = proto[methodName];
          if (typeof method === "function") {
            const routePath: string = Reflect.getMetadata("path", method);
            const routeMethod: HttpMethod = Reflect.getMetadata(
              "method",
              method
            );

            console.log(
              `Registering route: ${basePath}${routePath} - ${routeMethod}`
            );

            if (routePath && routeMethod) {
              router[routeMethod](
                routePath,
                async (req: Request, res: Response) => {
                  try {
                    const result = await method.call(
                      controllerInstance,
                      req,
                      res
                    );
                    if (result !== undefined && !res.headersSent) {
                      res.json(result);
                    }
                  } catch (err: any) {
                    res
                      .status(500)
                      .json({ error: err.message || "Internal server error" });
                  }
                }
              );
            }
          }
        }

        app.use(basePath, router);
      }

      for (const importedModule of imports) {
        registerModule(importedModule);
      }
    }

    registerModule(rootModule);

    return app;
  }
}
