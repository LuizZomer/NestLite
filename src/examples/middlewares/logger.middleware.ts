import { NestLiteMiddleware } from "@/core/middlewares/types";
import { NextFunction, Request, Response } from "express";

export class LoggerMiddleware implements NestLiteMiddleware {
  use(
    req: Request & { middleware?: string },
    res: Response,
    next: NextFunction
  ): void {
    console.log("LoggerMiddleware");
    req.middleware = "LoggerMiddleware";
    next();
  }
}
