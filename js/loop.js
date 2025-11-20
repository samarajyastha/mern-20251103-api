/**Loop: Repeating over and over, round and round
 * 1. for
 * 2. while
 * 3. do while
 * // array method
 * 4. for each
 * 5. map
 * 6. filter
 *
 */

console.log(1 * 1);
console.log(2 * 2);
// ...
console.log(10 * 10);

/** For loop:
 * for(start point; condition; increment/decrement ) {
 *
 * }
 *
 */

console.log("===========FOR=============");
// for (let i = 1; i <= 10; i = i + 2)
for (let i = 1; i <= 10; i++) {
  //code
  console.log(i);
}

/**While loop
 *
 * while(condition){
 * //code
 *
 * increment/decrement
 *
 * }
 *
 */
console.log("===========WHILE=============");
let i = 1;

while (i <= 10) {
  //code
  console.log(i * 2);

  i++;
}

console.log("===========LIST=============");

const students = [
  "Ram",
  "Hari",
  "Shyam",
  "Mohan",
  "Rabi",
  "Sita",
  "Gita",
  "Rajesh",
];

// console.log(students[0]);
// console.log(students[1]);

for (let i = 0; i < students.length; i++) {
  console.log(students[i]);
}

let j = 1;

while (j < students.length) {
  console.log(students[j]);

  j++;
}
