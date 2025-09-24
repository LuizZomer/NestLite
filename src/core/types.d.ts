type Constructor<T = any> = new (...args: any[]) => T;

interface ModuleMetadata {
  controllers?: Constructor[];
  imports?: Constructor[];
  providers?: Constructor[];
}
