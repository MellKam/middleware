import { Middleware, wrap } from "../index";

const errorHandler: Middleware<typeof fetch> = async (args, next) => {
  const res = await next(...args);
  if (res.ok) return res;

  throw new Error(res.statusText);
};

const wrappedFetch = wrap(fetch).use(errorHandler).run;

console.log(await wrappedFetch("https://httpbin.dmuth.org/status/200")); // will not throw an error

console.log(await wrappedFetch("https://httpbin.dmuth.org/status/404")); // will throw an error
