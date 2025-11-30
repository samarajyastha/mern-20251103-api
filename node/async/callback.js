// Callback: function used as a parameter
// Higher order function: function that accepts a function as parameter

// Asynchronous programming
import fs from "fs";

// non-blocking (async) task
fs.readFile(
  "node/data/data.txt",
  "utf8",
  //callback function
  (error, data) => {
    if (error) throw error;

    console.log(data);
  }
);

console.log("Hello world 1");
console.log("Hello world 2");
console.log("Hello world 3");

// Callback hell
fs.readFile("node/data/users.json", "utf8", (error, users) => {
  if (error) throw error;

  const userList = JSON.parse(users);

  fs.readFile("node/data/posts.json", "utf8", (pError, posts) => {
    if (pError) throw pError;

    const postList = JSON.parse(posts);

    const result = userList.map((user) => {
      return {
        ...user,
        posts: postList
          .map((post) => (post.userId == user.id ? post : null))
          .filter(Boolean),
      };
    });

    fs.readFile("node/data/comments.json", "utf8", (cError, comments) => {
      if (cError) throw cError;

      console.log(comments);
    });

    console.log(result);
  });
});
