import { createServer, type RequestListener } from "node:http";
import { wrap, type Middleware } from "../index";

const listener: RequestListener = (req, res) => {
  res.end("Hello World");
};

const middleware: Middleware<RequestListener> = ([req, res], next) => {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.end("Method Not Allowed");
    return;
  }

  return next(req, res);
};

const server = createServer(wrap(listener).use(middleware).run);

server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
