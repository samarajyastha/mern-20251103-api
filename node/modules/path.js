import path from "path";
import url from "url";

// const path = require("path");

const filePath = "folder1/folder2/folder3/folder4/readme.md";

// filename: path.baseName()
const fileName = path.basename(filePath);

console.log(fileName);

// extension: path.extname()
console.log(path.extname(filePath));

// folders: path.dirname()
console.log(path.dirname(filePath));

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);
console.log(__filename);
