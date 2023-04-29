export type MiddlewareFn<TArgs extends any[], TReturn> = (
  args: TArgs,
  next: (...args: TArgs) => TReturn
) => TReturn;

export type Middleware<TArgs extends any[], TReturn> = {
  run: (...args: TArgs) => TReturn;
  use: (middleware: MiddlewareFn<TArgs, TReturn>) => Middleware<TArgs, TReturn>;
};

export const middleware = <TArgs extends any[], TReturn>(
  fn: (...args: TArgs) => TReturn
): Middleware<TArgs, TReturn> => {
  return {
    run: fn,
    use: (mv: MiddlewareFn<TArgs, TReturn>): Middleware<TArgs, TReturn> => {
      return middleware<TArgs, TReturn>((...args) => mv(args, fn));
    },
  };
};
