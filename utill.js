const util = require('util');

let result = util.format(
    "Student Name : %s,Age : %d,Details : %j",
    "RIYA",
    25,
    {
        city: "Surat", Course: "MCA"
    }
)

console.log("----util.format()----");
console.log(result);

const student = {
    id: 101,
    name: "RIYA",
    address: {
        city: "Surat",
        state: "Gujarat"
    }
}

console.log("\n---util.inspect()---");
console.log(
    util.inspect(student, {
        depth: null,
        colors: false
    })
)

console.log(util.types.isDate(new Date()));
console.log(util.types.isDate("01/01/2025"));

console.log(util.types.isRegExp(/abc/));
console.log(util.types.isRegExp("abc"));

function addition(a, b, callback) {
    setTimeout(() => {
        callback(null, a + b);
    }, 1000);
}

const addPromise = util.promisify(addition);
addPromise(10, 20).then(result => {
    console.log("Addition =", result);
}).catch(error => {
    console.log(error);
})