import express from "express";
import fs from "fs";
import config from "./config/config.js";

const app = express();

// HTTP GET
app.get("/", (req, res) => {
  res.json({
    name: config.name,
    port: config.port,
    version: config.version,
    status: "OK",
  });
});

app.get("/about", (req, res) => {
  res.send("Hello from about");
});

app.get("/contact", (req, res) => {
  res.send({
    phone: 987465132,
    email: "test@gmail.com",
    address: "Itahari",
  });
});

// HTTP POST
app.post("/", (req, res) => {
  res.status(201).send("Create data from home page");
});

app.put("/", (req, res) => {
  res.send("Update data from home page");
});

app.delete("/", (req, res) => {
  res.status(403).send("Delete data from home page");
});

app.patch("/", (req, res) => {
  res.send("patch");
});

app.get("/products", (req, res) => {
  const products = fs.readFileSync("data/products.json", "utf8");

  const data = JSON.parse(products);

  res.json(data);
});

app.get("/admin", (req, res) => {
  if (config.feature.admin.enabled) {
    res.send("Admin panel");
  } else {
    res.status(400).send("Admin panel not enabled.");
  }
});

app.listen(config.port, () => {
  console.log(`Server is running at port: ${config.port}...`);
});
