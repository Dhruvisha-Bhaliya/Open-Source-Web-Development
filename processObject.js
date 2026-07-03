// The process object is global object.
// It does NOT require the require() function to be accessed.

console.log("Process ID:", process.pid);
console.log("Node.js Version:", process.version);
console.log("Current Working Directory:", process.cwd());

// Display the operating system information

console.log("Operating System Type:", process.release.name);

// Display the command used to run the program

console.log("Node Executable Path:", process.execPath);

// Display the JavaScript File name passed as an argument

console.log("JavaScript File Name:", process.argv);

// Display the Home user Environment variable(mac vary by OS)

console.log("Home User Environment Variable:", process.env.HOME || process.env.USERPROFILE);

// Display the current memory usage
// Total memory occupied by the Node.js process(Resident Set Size)

console.log("Current Memory Usage:", process.memoryUsage());

// Display a message before exiting the program

console.log("Program Executed Successfully! ");