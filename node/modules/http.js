import http from "http";

const server = http.createServer((request, response) => {
  //   console.log(request.method);
  //   console.log(request.url);
  //   const user = {
  //     name: "Ram",
  //     age: 20,
  //     address: "Itahari",
  //   };

  //   response.writeHead(200, { "content-type": "application/json" });
  //   //   response.end("<h1>Hello world</h1>");
  //   response.end(JSON.stringify(user));

  switch (request.method) {
    case "GET":
      switch (request.url) {
        case "/":
          return response.end("Home page");

        case "/about":
          return response.end("About page");

        case "/contact":
          return response.end("Contact page");

        default:
          response.writeHead(404);
          return response.end("Page not found.");
      }

    case "POST":
      return response.end("Hello from POST");

    default:
      response.writeHead(405);
      return response.end("Method not allowed.");
  }
});

server.listen(5000, () => {
  console.log("Server running at port 5000...");
});
