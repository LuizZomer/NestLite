import { NextFunction, Request, Response } from "express";

interface NestLiteMiddleware {
  use(req: Request, res: Response, next: NextFunction): void;
}
