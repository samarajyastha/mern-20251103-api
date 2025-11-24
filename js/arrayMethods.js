const list = [
  8, 64, 65, 135, 1, 89, 968, 651, 456, 3, 46, 864, 6, 123, 8, 684, 35, 51,
];
console.log(list);

/** double all the numbers in the list */
const dblList = [];

for (let i = 0; i < list.length; i++) {
  const dblValue = list[i] * 2;

  dblList.push(dblValue);
}

console.log(dblList);

/** Map: array.map() => array
 * [a, b, c] => map => [x, y, z]
 */

const dblMapList = list.map((value, index) => value * 2);

console.log("==================MAP=====================");
console.log(dblMapList);

/**
 * Filter: array.filter() => array
 * [a, b, a, a] => filter(a) => [a, a, a]
 */
const evenList = [];

for (let i = 0; i < list.length; i++) {
  const isEven = list[i] % 2 == 0;

  if (isEven) {
    evenList.push(list[i]);
  }
}

console.log(evenList);

const filteredList = list.filter((value, index) => value % 2 == 0);
console.log("==================FILTER=====================");
console.log(filteredList);

const filteredList2 = list.filter((value) => value >= 100);

console.log(filteredList2);

const students = [
  {
    name: "Ram",
    age: 20,
    faculty: "BCA",
  },
  {
    name: "Hari",
    age: 45,
    faculty: "BBS",
  },
  {
    name: "Sita",
    age: 42,
    faculty: "BBS",
  },
  {
    name: "Mohan",
    age: 15,
    faculty: "BSc",
  },
  {
    name: "Rohan",
    age: 25,
    faculty: "BBA",
  },
];

/** Find: array.find()
 *  [a, b, c, d] => find(a) => a
 *
 */

const foundResult = students.find((value) => value.faculty == "BBS"); // first found result
console.log(foundResult);

console.log(students.filter((value) => value.faculty == "BBS"));

/**
 * Includes : array.includes(a) => boolean
 * Some : array.some(a) => boolean
 * Every : array.some(a) => boolean
 */

const includesResult = list.includes(64);

console.log(includesResult);

const someResult = list.some((value) => value >= 100); //true
const everyResult = list.every((value) => value >= 100); // false

console.log("some", someResult);
console.log("every", everyResult);

/** Sort: array.sort(a,b)
 * a-b => ASC
 * b-a => DESC
 */

list.sort((a, b) => a - b); // asc

students.sort((a, b) => b.name.localeCompare(a.name)); //desc

console.log(list);
console.log(students);

// const sumResult = [];
let sum = 0;

for (let i = 0; i < list.length; i++) {
  sum = sum + list[i];
}

console.log(sum);

const sumResult = list.reduce((prev, current) => prev + current, 0);

console.log(sumResult);
