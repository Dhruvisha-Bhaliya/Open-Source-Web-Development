// Import the HTTP module
const http = require("http");

// Create an HTTP server
const server = http.createServer(function (req, res) {

    //send HTTP response header
    res.writeHead(200, { "Content-Type": "text/html" });

    //send response to the browser
    res.write("<h1>Welcome to Node.js Server</h1>");
    res.write("<p>This is a simple HTTP server created using Node.js.</p>");

    //End the response
    res.end();
});

// Start the server and listen on port 3000
server.listen(3000, function () {
    console.log("Server is running at http://localhost:3000");
});
