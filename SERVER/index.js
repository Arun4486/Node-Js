import http from "http";
import fs from "fs";
import express from "express";
// fs.writeFileSync("./logs.txt", "## logs");
// const MyServer = http.createServer((req, res) => {
//   console.log("req received");
//   res.end("Hello from server");
// console.log(res);
//   const log = `\n${Date.now().toLocaleString()}: {Url: ${req.url} Method:${req.method} New req received}\n`;

/* fs.appendFile("./logs.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("Home");
        break;
      case "/about":
        res.end("about page");
        break;
      case "/contacts":
        res.end("contact page");
        break;
      case "/complaint":
        if (req.method === "GET") res.end("Fill your conplaint in the form");
      default:
        res.end("404 not found");
    }
  });
});
*/
// MyServer.listen(8000, () => console.log("Server started"));

const app = express();
app.get("/", (req, res) => res.send("Hello from server"));
app.get("/about", (req, res) => {
  return res.send(`Hello ${req.query.user}, Welcome back!`);
});
app.listen(3000, () => console.log("server live at port 3000"));
