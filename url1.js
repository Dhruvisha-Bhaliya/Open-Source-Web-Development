const myURL = new URL("https://example.com:8080/products/mobile?brand=samsung&price=30000#review");

console.log("Complete URL : ", myURL.href);
console.log("Protocol : ", myURL.protocol);
console.log("Origin : ", myURL.origin);
console.log("Host : ", myURL.host);
console.log("Hostname : ", myURL.hostname);
console.log("Port : ", myURL.port);
console.log("Pathname : ", myURL.pathname);
console.log("Query String : ", myURL.search);
console.log("Hash: ", myURL.hash);


console.log("\nReading Query Parameters: ");
console.log("Brand = ", myURL.searchParams.get("brand"));
console.log("Price = ", myURL.searchParams.get("price"));
console.log("\nChecking Parameter: ");

console.log("Does 'brand' exist ? ", myURL.searchParams.has("brand"));
console.log("Does 'color' exist ? ", myURL.searchParams.has("color"));

console.log("\n Adding Parameter");
myURL.searchParams.append("color", "black");
myURL.searchParams.append("memory", "35000");
console.log(myURL.href);

console.log("\nDeleting Parameters: ")
myURL.searchParams.delete("memory");
console.log(myURL.href);

console.log("\nModifying URL: ");
myURL.pathname = "/electronics/laptop";
myURL.hash = "specification";
console.log(myURL.href);

console.log("\nCreating Another URL: ");
const googleURL = new URL("https://google.com");
googleURL.pathname = "/search";
googleURL.searchParams.append("q", "Node JS URL Module");
console.log(googleURL.href);



