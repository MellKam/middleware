export type Middleware<
  TFn extends (...args: any[]) => any = (...args: any[]) => any
> = (
  args: Parameters<TFn>,
  next: (...args: Parameters<TFn>) => ReturnType<TFn>
) => ReturnType<TFn>;

export type MiddlewareWrapper<
  TFn extends (...args: any[]) => any = (...args: any[]) => any
> = {
  run: TFn;
  use: (mw: Middleware<TFn>) => MiddlewareWrapper<TFn>;
};

/**
 * Creates a middleware wrapper for a given function.
 * The resulting wrapper can be used to apply middlewares to the original function.
 *
 * @param fn The function you want to wrap with middleware
 * @returns A middleware wrapper object
 */
export const wrap = <
  TFn extends (...args: any[]) => any = (...args: any[]) => any
>(
  fn: TFn
): MiddlewareWrapper<TFn> => {
  return {
    run: fn,
    use: (mw: Middleware<TFn>) => {
      return wrap((...args: Parameters<TFn>) => mw(args, fn));
    },
  } as MiddlewareWrapper<TFn>;
};
