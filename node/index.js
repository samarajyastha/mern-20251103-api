const fs = require("fs");

// Non-blocking operation
fs.readFile("../test.txt", "utf-8", (error, data) => {
  if (error) throw error;

  console.log(data);
});

const result = fs.readFileSync("../test.txt", "utf-8")

console.log(result);

console.log("hello sam");

const name = "ram";

console.log(`hello ${name}`);
