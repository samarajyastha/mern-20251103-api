// print in console
console.log("hello");
console.error("this is error");
console.warn("this is warning");
console.info("this is info");

// Variable: memory element: const, let, var
/**
 * Syntax: let/const/var <var_name> = <value>
 */
var age = 20;
var age = 30;
var name = "ram";
var isMale = true;
console.log(age);

let marks = 30;
marks = 40;
marks = 100;

console.log(marks);

const address = "Dharan";

console.log(address);
// Note: NEVER USE var

// Data types
/**
 * 1. String "Ram"
 * 2. Number 50, 56.3
 * 3. Boolean true, false
 * 4. Object {key: value}
 * 5. Array [12,34,56,78,89,12]
 */

const studentName = "Rohan Shrestha"; // String
const faculty = "BSC CSIT";
const gpa = 3.5; // Number
const isPass = true; // Boolean

console.log(studentName, faculty, gpa, isPass);

// Object, key -> Value pair
const details = {
  name: "Rohan shrestha",
  gpa: 3.5,
  isPass: true,
  address: {
    city: "Dharan",
    province: "Koshi",
  },
  phone: [987654160, 894623185351],
};

console.log(details["isPass"]);
console.log(details.phone);
console.log(details.gpa);

console.log(details.address.city);

// Array: list
// Array has index starting  from 0 (Zero)
const grades = [3.2, 4, 2.5, 3.9];
const test = [
  321,
  "hello",
  true,
  false,
  { class: 10, faculty: "BCA" },
  [23, 4, "world"],
];

console.log(test);  
console.log(grades[0]);
console.log(test[1]);
console.log(test[5][2]);
console.log(test[4].faculty);
