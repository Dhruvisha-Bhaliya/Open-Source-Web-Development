process.on("exit", (code) => {
    console.log("\n[EXIT EVENT]");
    console.log("Process is exiting...");
    console.log("Exit Code: ", code);
});

process.on("beforeexit", (code) => {
    console.log("\n[BEFORE EXIT EVENT]");
    console.log("Event Loop is empty...");
    console.log("Exit Code: ", code);
});

process.on("uncaughtException", (err) => {
    console.log("\n[UNCAUGHT EXCEPTION EVENT]");
    console.log("Error Message :", err.message);
    process.exit(1);
});

process.on("SIGINT", () => {
    console.log("\n[SIGINT EVENT]");
    console.log("Ctrl + C pressed.");
    console.log("Program Terminated");
    process.exit(0);
});

console.log("Program Started...");
console.log("Process Ctrl + C to trigger SIGINT.");
console.log("Waiting for Events...");

setInterval(() => {
    console.log("Application Running...");
}, 3000);