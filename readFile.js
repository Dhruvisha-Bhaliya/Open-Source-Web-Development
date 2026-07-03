// Asynchronous file reading using Node.js

const fs = require("fs");
fs.readFile('test.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    console.log("File Data:");
console.log(data);
});
console.log("Do Other Tasks");