/** if - else statement */
/**
 * if(condition){
 *  // code
 * } else{
 * //code
 * }
 */

const age = 30;
const gender = "M";

if (age >= 18) {
  console.log("I am inside if statement.");
} else {
  console.log("I am else statement.");
}

/** if - else if - else ladder statement */
if (age >= 0 && age <= 5) {
  console.log("toddler");
} else if (age >= 6 && age <= 12) {
  console.log("children");
} else if (age >= 13 && age <= 19) {
  console.log("teenager");
} else if (age >= 20 && age <= 35) {
  console.log("adult");
} else if (age >= 36 && age <= 55) {
  console.log("middle aged");
} else if (age >= 56) {
  console.log("elderly");
} else {
  console.log("Invalid age");
}

/** Nested if - else statement */
if (age >= 18) {
  if (gender == "M") {
    console.log("Adult male");
  } else {
    console.log("Adult female");
  }
} else {
  if (gender == "M") {
    console.log("Children male");
  } else {
    console.log("Children female");
  }
}

/** switch statement */
const day = "Wednesday";

switch (day) {
  case "Sunday":
    console.log("Sunday");
    break;
  case "Monday":
    console.log("Monday");
    break;
  case "Tuesday":
    console.log("Tuesday");
    break;
  case "Wednesday":
    console.log("Wednesday");
    break;
  case "Thursday":
    console.log("Thursday");
    break;
  case "Friday":
    console.log("Friday");
    break;
  case "Saturday":
    console.log("Saturday");
    break;
  default:
    console.log("Invalid day");
    break;
}

/** Ternary Operator: condition ? true : false */

const ageGroup = age >= 18 ? "Adult" : "Children";
console.log(ageGroup);
