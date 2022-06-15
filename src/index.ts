import dotenv from 'dotenv';
import http from 'http';

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
  //set the request route
  if (req.url === "/api" && req.method === "GET") {
      //response headers
      res.writeHead(200, { "Content-Type": "application/text" });
      //set the response
      res.write("Hi there, This is a Vanilla Node.js API");
      //end the response
      res.end();
  }

  // If no route present
  else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});