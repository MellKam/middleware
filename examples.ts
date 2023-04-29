import { middleware } from "./index";

const result = middleware((a: number, b: number) => a + b)
  .use((args, next) => {
    console.log("Middleware 2");
    return next(...args);
  })
  .use((args, next) => {
    console.log("Middleware 1");
    return next(...args);
  }).run;

console.log(result(5, 8));

const fetch2 = middleware(fetch).use(async (args, next) => {
  const res = await next(...args);
  if (res.ok) {
    return res;
  }

  throw new Error(await res.text());
}).run;

console.log(await fetch2("https://google.com"));

middleware((a, b) => {
  console.log("Actual function logic");
  return a + b;
})
  .use((args, next) => {
    console.log("A: Before logic");

    const result = next(...args);

    console.log("A: After logic");
    return result;
  })
  .use((args, next) => {
    console.log("B: Before logic");

    const result = next(...args);

    console.log("B: After logic");
    return result;
  })
  .run(10, 5);
