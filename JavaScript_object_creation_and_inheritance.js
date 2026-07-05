// 1. Creating an object using an Object Literal

// Define an object named person

var person = {
    firstname : "Fname",
    lastname : "Lname",
    id : 5,

    fullname : function() {
        return this.firstname + " " + this.lastname;
    }
}

// Create a new object (p1) that inherits from the person object

var p1 = Object.create(person);

// Call the inherited method fullname()

console.log("Full Name:", p1.fullname()); // Output: Full Name: Fname Lname

// 2. Creating an object using object Literal

var emp = {
    id : 102,
    name : "Shyam Kumar",
    salary : 40000,
};

console.log("emp.id: " + emp.id); // Output: emp.id: 102
console.log("emp.name: " + emp.name); // Output: emp.name: Shyam Kumar
console.log("emp.salary: " + emp.salary); // Output: emp.salary: 40000      

// 3. Creating an object using new Object()

var emp1 = new Object();
emp1.id = 103;
emp1.name = "Rani Kumar";
emp1.salary = 50000;

console.log("\n\n"+emp1.id+ " " + emp1.name + " " + emp1.salary); // Output: emp1.id: 103

// 4. Creating an object using a constructor function

function emp2(id, name, salary) {
    this.id = id;
    this.name = name;
    this.salary = salary;
}

var e = new emp2(104, "Vimal Jaiswal", 60000);

console.log("\n\n"+e.id+ " " + e.name + " " + e.salary); // Output: emp2.id: 104

// 5. Creating an Objects using ES6 classes and inheritance

class Bike {
    constructor(company){
        this.company = company;
    }
}

// child class inherits from Bike
class vehicle extends Bike {
    constructor(company, name, price){
        super(company); // Call the parent constructor
        this.name = name;
        this.price = price;
    }
}

var v = new vehicle("Honda", "CBR", 200000);

console.log("\n\n"+v.company+ " " + v.name + " " + v.price); // Output: Honda CBR 200000