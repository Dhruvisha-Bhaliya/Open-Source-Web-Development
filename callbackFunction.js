function greet(name, callback) {
    console.log("Hello " + name);
    callback();
}

greet("Alice", () => {
    console.log("Callback executed!");
});