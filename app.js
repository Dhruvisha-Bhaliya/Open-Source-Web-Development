const readline = require("readline");
const chatbot = require("./chatbot");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Ask Question : ", (q) => {
    console.log(chatbot(q));
    rl.close();
})