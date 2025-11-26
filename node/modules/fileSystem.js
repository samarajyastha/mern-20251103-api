import fs from "fs";

/**
 * fs: file system is a node js module for file operations, like create, read, update, delete files
 * fs operations can be done using 2 methods: synchronous & asynchronous
 * synchronous: blocking operation, wait for this operation to complete
 * asynchronous: non-blocking operation
 */

// Synchronous Method
// Read file
// const result = fs.readFileSync("data/data.txt", "utf8");
// console.log(result);

// const image = fs.readFileSync("data/cat.jpg", "base64");
// console.log(image);

// Write file
// fs.writeFileSync("data/data.txt", "This is a newly added value.");
// fs.writeFileSync("data/image.txt", image);
// fs.writeFileSync("")

// Update file: append
// fs.appendFileSync("data/data.txt", "\nThis file is appended.");

// Delete: rm
// fs.unlinkSync("data/image.txt"); // remove only file
// fs.rmSync("data/image.txt"); // remove file and folder
// fs.rmSync("test/testfolder", { recursive: true });

// Asynchronous Method
fs.readFile("data/data.txt", "utf8", (error, data) => {
  if (error) throw error;

  console.log(data);
});

console.log("Hello");

fs.writeFile("data/text.txt", "This is a new text file.", () => {
  console.log("Data written successfully.");
});

fs.appendFile("data/text.txt", "\n this is updated text", () => {});

fs.rm("data/text.txt", () => {});
// fs.unlink();
