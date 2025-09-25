import { Request } from "express";

export interface IParamResolver {
  supports(paramType: string): boolean;
  resolve(target: any, index: number, metadata: any, req: Request): any;
}

export class BodyParamResolver implements IParamResolver {
  supports(paramType: string): boolean {
    return paramType === "body";
  }

  resolve(_: any, index: number, metadata: any, req: Request): any {
    return req.body;
  }
}

export class RouteParamResolver implements IParamResolver {
  supports(paramType: string): boolean {
    return paramType === "param";
  }

  resolve(
    _: any,
    index: number,
    metadata: { name: string },
    req: Request
  ): any {
    return req.params[metadata.name];
  }
}

export class QueryParamResolver implements IParamResolver {
  supports(paramType: string): boolean {
    return paramType === "query";
  }

  resolve(
    _: any,
    index: number,
    metadata: { name: string },
    req: Request
  ): any {
    return req.query[metadata.name];
  }
}

export class ResponseResolver implements IParamResolver {
  supports(paramType: string): boolean {
    return paramType === "res";
  }

  resolve(
    _: any,
    index: number,
    metadata: { name: string },
    req: Request
  ): any {
    return req.res;
  }
}

export class RequestResolver implements IParamResolver {
  supports(paramType: string): boolean {
    return paramType === "req";
  }

  resolve(
    _: any,
    index: number,
    metadata: { name: string },
    req: Request
  ): any {
    return req;
  }
}
