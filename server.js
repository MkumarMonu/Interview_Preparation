const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  var filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);
  const extName = String(path.extname(filePath)).toLocaleLowerCase();
  const mimeType = {
    ".html": "text/html",
    ".js": "js/html",
    ".css": "css/html",
    ".png": "png/html",
  };

  const contentType = mimeType[extName] || "aplication/octet-stream";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end("Page not found!");
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data, "utf-8");
    }
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
