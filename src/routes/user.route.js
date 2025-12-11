import express from "express";
import userController from "../controllers/user.controller.js";
import validate from "../middlewares/validator.js";
import { userSchema } from "../libs/schemas/user.js";

const router = express.Router();

router.get("/", userController.getUsers);

router.post("/", validate(userSchema), userController.createUser);

export default router;
