Universal and lightweight middleware utility

Introduction:

This TypeScript library provides a simple implementation of middleware pattern
which can be used to wrap or augment functions with additional functionality
without modifying their original implementation.

# Usage

1. Creating a Middleware object:

```ts
const myFunction = (name: string, age: number) => {
  console.log(`${name} is ${age} years old.`);
};

const myMiddleware = middleware(myFunction)
  .use((args, next) => {
    console.log(`Before function execution`);
    return next(...args);
    console.log(`After function execution`);
  }).run;

myMiddleware("Alice", 25);

// Before function execution
// Alice is 25 years old.
// After function execution
```

### Before/after concept

```js
const mv: MiddlewareFn = (args, next) => {
  //
  // BEFORE
  //

  const result = next(req);

  //
  // AFTER
  //

  return res;
};
```

# Execution order (LIFO)

Since everything is a middleware, the order of execution is important.

Middlewares are executed in LIFO order ("Last In, First Out").

Everytime you push a new middleware to the stack, it is added as a new onion
layer on top of all existing ones.

Example

```js
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
```

Execution order:

1. `B` Before logic
2. `A` Before logic
3. Actual function logic
4. `A` After logic
5. `B` After logic

# Fetch example

```ts
const modifiedFetch = middleware(fetch).use(async (args, next) => {
  const res = await next(...args);
  if (res.ok) {
    return res;
  }

  throw new Error(await res.text());
}).run;

console.log(await modifiedFetch("https://example.com"));
```
