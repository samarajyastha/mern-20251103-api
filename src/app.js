import bodyParser from "body-parser";
import express from "express";
import multer from "multer";
import cors from "cors";

import auth from "./middlewares/auth.js";
import authRoute from "./routes/auth.route.js";
import config from "./config/config.js";
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/database.js";
import logger from "./middlewares/logger.js";
import orderRoute from "./routes/order.route.js";
import productRoute from "./routes/product.route.js";
import pageRoute from "./routes/page.route.js";
import userRoute from "./routes/user.route.js";

const app = express();

const upload = multer({ storage: multer.memoryStorage() });

connectDB();
connectCloudinary();

app.use(bodyParser.json());

app.use(logger);

app.use(cors());

app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.json({
    name: config.name,
    port: config.port,
    version: config.version,
    status: "OK",
  });
});

app.use("/api/products", upload.array("images", 5), productRoute);
app.use("/api/users", auth, upload.single("image"), userRoute);
app.use("/api/auth", authRoute);
app.use("/api/orders", auth, orderRoute);
app.use("/pages", pageRoute);

app.listen(config.port, () => {
  console.log(`Server is running at port: ${config.port}...`);
});
