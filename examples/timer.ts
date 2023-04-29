import { Middleware, wrap } from "../index";

const fibonacci = (n: number): number => {
  if (n <= 1) return n;

  return fibonacci(n - 1) + fibonacci(n - 2);
};

const timer: Middleware = (args, next) => {
  console.time("timer");
  const result = next(...args);
  console.timeEnd("timer");
  return result;
};

console.log(wrap(fibonacci).use(timer).run(40));

const createTimer = (label: string): Middleware => {
  return (args, next) => {
    console.time(label);
    const result = next(...args);
    console.timeEnd(label);
    return result;
  };
};

console.log(wrap(fibonacci).use(createTimer("fibonacci")).run(40));
