
// 1. console object
// Used to display messages on the terminal.

console.log("Welcome to Node.js Global Objects");
console.warn("warning message");
console.error("error message");

// 2. global object
// global object allows to create global vaiables that can be accessed from anywhere in the application.

global.studentName = "John Doe";
console.log("Student Name:", global.studentName);

// 3. process object
// provides information about the current Node.js process and allows interaction with it.

console.log("Process ID:", process.pid);
console.log("Node.js Version:", process.version);
console.log("Current Working Directory:", process.cwd());

// 4. __dirname
// Represents the directory path of the current JavaScript file.

console.log("Current Directory:", __dirname);

// 5. __filename
// Represents the full path of the current JavaScript file.

console.log("Current File:", __filename);

// 6. Buffer object
// Used to handle binary data in Node.js.
const buffer = Buffer.from("Hello, Node.js!");
console.log("Buffer", buffer);
console.log("Buffer Data:", buffer.toString());

// 7. setTimeout()
// Executes a function only once after a specified delay in milliseconds.

setTimeout(() => {
    console.log("This message is displayed after 2 seconds");
}, 2000);

// 8. setInterval()
// Executes a function repeatedly at specified intervals in milliseconds.
let count = 1;
const interval = setInterval(() => {
    console.log(`This message is displayed every 1 second. Count: ${count}`);
    count++;

// 9. clearInterval()
// Stops the execution of a function that was set to run at intervals using setInterval().
    if (count > 5) {
        clearInterval(interval);
        console.log("Interval cleared after 5 executions");
    }
}, 1000);

// 10. clearTimeout()
// Stops a Scheduled timeout before it executes using setTimeout().
const timeout = setTimeout(() => {
    console.log("You Should not see this message because the timeout is cleared before execution");
}, 3000);

clearTimeout(timeout);
console.log("Timeout Cancelled Successfully.");