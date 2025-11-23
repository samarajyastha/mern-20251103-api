/**
 * Function: Perform specific tasks
 *
 * function <functionName> (params?) {
 * //code
 * }
 */

function square(value) {
  console.log("square: ", value * value);
}

square(5);
square(6);
square(3);
square(34);
square(657);

function greet(name) {
  console.log("Hello ", name);
}

greet("Ram");
greet("Hari");
greet("Rohan");

function sum(value1, value2) {
  console.log(value1 + value2);
}

sum(67, 86); // function call
sum(85, 963);

function sumReturn(value1, value2) {
  const result = value1 + value2;

  return result;
}

const addedResult = sumReturn(5, 6);
square(addedResult);

function myFunction(val1, val2) {
  const addedValue = val1 + val2;
  const mulValue = val1 * val2;

  // return { addedValue, mulValue };
  return [addedValue, mulValue];
}

const myResult = myFunction(5, 8);
console.log(myResult);
