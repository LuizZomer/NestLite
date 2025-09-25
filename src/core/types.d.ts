import { MiddlewareConsumer } from "./middlewares/consumer";

type Constructor<T = any> = new (...args: any[]) => T;

interface ModuleMetadata {
  controllers?: Constructor[];
  imports?: Constructor[];
  providers?: Constructor[];
}

interface NestLiteModule {
  configure(config: MiddlewareConsumer): void;
}
