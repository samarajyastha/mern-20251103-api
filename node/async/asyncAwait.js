import fs from "fs/promises";
let loading;

// Important
async function read() {
  loading = true;
  try {
    const users = await fs.readFile("node/data/users.json", "utf8");
    const posts = await fs.readFile("node/data/posts.json", "utf8");
    const comments = await fs.readFile("node/data/comments.json", "utf8");

    console.log(users);
  } catch (error) {
    // console.log(error);
    console.log("Error reading file.");
  } finally {
    loading = false;
    console.log("Finally completed");
  }
}

// async arrow function
// const read = async () => {};

read();

console.log("hello");
