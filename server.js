const http = require("http");

const server = http.createServer((request, response) => {
  const { method, url } = request;
  if (method === "GET" && url === "/api") {
    response.setHeader("content-type", "application/json");
    response.statusCode = 200;
    response.write(JSON.stringify({ message: "Hello!" }));
    response.end();
  }
});

server.listen(8000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("listening on 8000");
  }
});
