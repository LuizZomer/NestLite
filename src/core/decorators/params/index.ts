export const Body = (): ParameterDecorator => {
  return (target, propertyKey, parameterIndex) => {
    if (!propertyKey) throw new Error("@Body cannot be used on constructors");

    Reflect.defineMetadata(
      `param:${parameterIndex}`,
      { type: "body" },
      target,
      propertyKey
    );
  };
};

export const Query = (name?: string): ParameterDecorator => {
  return (target, propertyKey, parameterIndex) => {
    if (!propertyKey) throw new Error("@Query cannot be used on constructors");

    Reflect.defineMetadata(
      `param:${parameterIndex}`,
      { type: "query", name },
      target,
      propertyKey
    );
  };
};

export const Param = (name: string): ParameterDecorator => {
  return (target, propertyKey, parameterIndex) => {
    if (!propertyKey) throw new Error("@Param cannot be used on constructors");

    Reflect.defineMetadata(
      `param:${parameterIndex}`,
      { type: "param", name },
      target,
      propertyKey
    );
  };
};
