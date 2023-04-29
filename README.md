<div align="center" style="margin: 20px 0;">
<img src="https://svgshare.com/i/sZt.svg" width="320px" />
<p>This library provides a simple implementation of a middleware pattern that can be used to wrap or extend functions with additional functionality without changing their original implementation.</p>
</div>

# Installation

```bash
npm install @mellkam/middleware
```

<a href="https://bundlejs.com/?q=%40mellkam%2Fmiddleware">
  <img src="https://deno.bundlejs.com/?q=@mellkam/middleware&badge=minified">
</a>

# Usage

```ts
import { type Middleware, wrap } from "@mellkam/middleware";

const timer: Middleware = (args, next) => {
  console.time("timer");
  const result = next(...args);
  console.timeEnd("timer");
  return result;
};

console.log(wrap(fibonacci).use(timer).run(40));

// timer: 1.518s
// 102334155
```

# Execution order (LIFO)

Middlewares are executed in LIFO order ("Last In, First Out").

Everytime you push a new middleware to the stack, it is added as a new onion
layer on top of all existing ones.

```js
import { wrap } from "@mellkam/middleware";

const log = wrap(console.log)
  .use((args, next) => {
    console.log("Middleware 1: Before");
    next(...args);
    console.log("Middleware 1: After");
  })
  .use((args, next) => {
    console.log("Middleware 2: Before");
    next(...args);
    console.log("Middleware 2: After");
  }).run;

log("Actual func call");
```

Logs:

```bash
Middleware 2: Before
Middleware 1: Before
Actual func call
Middleware 1: After
Middleware 2: After
```

### Before/After concept

```ts
const mw: Middleware = (args, next) => {
  //
  // BEFORE
  //
  next(...args);
  //
  // AFTER
  //
};
```

[Check out more examples here](https://github.com/MellKam/middleware/tree/main/examples)
