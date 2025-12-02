import express from "express";
import config from "./config/config.js";
import productRoute from "./routes/product.route.js";

// root

const app = express();

app.get("/", (req, res) => {
  res.json({
    name: config.name,
    port: config.port,
    version: config.version,
    status: "OK",
  });
});

app.use("/api/products", productRoute);

app.listen(config.port, () => {
  console.log(`Server is running at port: ${config.port}...`);
});
