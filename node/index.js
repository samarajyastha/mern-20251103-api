// const fs = require("fs");

// const { square } = require("./utils.js");

import fs from "fs";

import greet, { square } from "./utils.js";

// Non-blocking operation
fs.readFile("../test.txt", "utf-8", (error, data) => {
  if (error) throw error;

  console.log(data);
});

const result = fs.readFileSync("../test.txt", "utf-8");

console.log(result);

console.log("hello sam");

const name = "ram";

console.log(`hello ${name}`);

const ressult = square(5);

console.log(ressult);

greet();
