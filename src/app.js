import bodyParser from "body-parser";
import express from "express";

import { ROLE_ADMIN } from "./constants/roles.js";
import auth from "./middlewares/auth.js";
import authRoute from "./routes/auth.route.js";
import config from "./config/config.js";
import connectDB from "./config/database.js";
import logger from "./middlewares/logger.js";
import productRoute from "./routes/product.route.js";
import roleBasedAuth from "./middlewares/roleBasedAuth.js";
import userRoute from "./routes/user.route.js";

const app = express();

connectDB();

app.use(bodyParser.json());

app.use(logger);

app.get("/", (req, res) => {
  res.json({
    name: config.name,
    port: config.port,
    version: config.version,
    status: "OK",
  });
});

app.use("/api/products", productRoute);
app.use("/api/users", auth, roleBasedAuth(ROLE_ADMIN), userRoute);
app.use("/api/auth", authRoute);

app.listen(config.port, () => {
  console.log(`Server is running at port: ${config.port}...`);
});
