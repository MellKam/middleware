import { wrap } from "../index";

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
  })
  .use((args, next) => {
    console.log("Middleware 3: Before");
    next(...args);
    console.log("Middleware 3: After");
  }).run;

log("Actual function call");
