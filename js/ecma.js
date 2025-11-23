/**
 * 1. Template literals
 * 2. Destructuring (Array, Object)
 * 3. Spread Operator
 * 4. Array methods
 * 5. Arrow function
 */

const name = "Ram";
const age = 20;
const address = "Itahari";

const result =
  "Hello my name is" +
  name +
  "and I am" +
  age +
  "years old. I live in" +
  address;

console.log(result);

//Template literals
const templateResult = `Hello my name is ${name} and I am ${age} years old. 
I live in ${address}.`;

console.log(templateResult);

const course = {
  title: "MERN stack",
  duration: "3 months",
  instructor: "Sam",
  fee: 2500,
};

// const title = course.title;
// const duration = course.duration;
// const courseFee = course.fee;

// Object destructuring
const { duration, instructor, fee: courseFee, title: myTitle } = course;

console.log(myTitle);
console.log(courseFee);

const students = ["Ram", "Mohan", "Rohan", "Hari"];
// Array destructuring
const [std4, std1, std2, std3] = students;

students[0];
students[students.length - 1];

console.log(std1, std2, std3, std4);

// Spread Operator: To copy data: (...)
const user = {
  name: "Sam",
  age: 20,
  address: "Dharan",
};

const details = {
  education: "BE",
  skill: "MERN",
  experience: "5 years",
  school: "My English Boarding School",
  father: "Ram",
  mother: "Sita",
};

const auth = {
  email: "sam@gmail.com",
  password: "123456",
  isActive: true,
  role: "USER",
  phone: [8979799, 458616841],
};

const userDetails = { ...user, ...details, ...auth };

console.log(userDetails);

const list1 = [
  153, 1, 351, 351, 351, 351, 35, 1135, 41, 8618, 61, 861, 684, 168, 1568, 56,
];
const list2 = [46, 8, "asdf", "adsfasdf", true, false, 0, 1, { key: "value" }];

const finalList = [...list2, ...list1];
console.log(finalList);

// function sum(value1, value2) {
//   const result = value1 + value2;

//   return result;
// }

// Arrow function
// const sum = (value1, value2) => {
//   return value1 + value2;
// };

const sum = (value1, value2) => value1 + value2;

const sumResult = sum(8, 56);
console.log(sumResult);

