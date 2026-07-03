// Synchronous readFileSync function to read files in Node.js

const fs = require("fs");
const data = fs.readFileSync('test.txt', 'utf8');
console.log("File Data:");
console.log(data);
console.log("Do Other Tasks");