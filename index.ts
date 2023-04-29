export type MiddlewareFn<
  TFn extends (...args: any[]) => any = (...args: any[]) => any
> = (
  args: Parameters<TFn>,
  next: (...args: Parameters<TFn>) => ReturnType<TFn>
) => ReturnType<TFn>;

export type Middleware<
  TFn extends (...args: any[]) => any = (...args: any[]) => any
> = {
  run: TFn;
  use: (mv: MiddlewareFn<TFn>) => Middleware<TFn>;
};

export const middleware = <
  TFn extends (...args: any[]) => any = (...args: any[]) => any
>(
  fn: TFn
): Middleware<TFn> => {
  return {
    run: fn,
    use: (mv: MiddlewareFn<TFn>) => {
      return middleware((...args: Parameters<TFn>) => mv(args, fn));
    },
  } as Middleware<TFn>;
};
