// Promises - Async programming, promise is a future value
// pending -> fulfilled, rejected

import fs from "fs/promises";

fs.readFile("node/data/data.txt", "utf8")
  .then((data) => console.log(data))
  .catch((error) => console.log(error))
  .finally(() => {});

fs.readFile("node/data/users.json", "utf8")
  .then((users) => {
    console.log(users);

    return fs.readFile("node/data/posts.json", "utf8");
  })
  .then((posts) => {
    console.log(posts);

    return fs.readFile("node/data/comments.json", "utf8");
  })
  .then((comments) => {
    console.log(comments);
  })
  .catch((error) => {
    console.log(error);
  });
