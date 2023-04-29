import assert from "node:assert";
import { test, mock } from "node:test";
import { Middleware, wrap } from "./index";

test("Basic", () => {
  const mockFn = mock.fn();

  wrap(mockFn).run(1, 2, 3);

  assert.deepStrictEqual(mockFn.mock.calls[0].arguments, [1, 2, 3]);
  assert(mockFn.mock.callCount() === 1);
});

test("With one middlware", () => {
  const mockFn = mock.fn();
  const mockMiddleware = mock.fn<Middleware>((args, next) => {
    return next(...args);
  });

  wrap(mockFn).use(mockMiddleware).run(1, 2, 3);

  assert.deepStrictEqual(mockFn.mock.calls[0].arguments, [1, 2, 3]);
  assert.deepStrictEqual(mockMiddleware.mock.calls[0].arguments, [
    [1, 2, 3],
    mockFn,
  ]);
  assert(mockMiddleware.mock.callCount() === 1);
  assert(mockFn.mock.callCount() === 1);
});
