import express from "express";

import { loginSchema, registerSchema } from "../libs/schemas/auth.js";
import authController from "../controllers/auth.controller.js";
import validate from "../middlewares/validator.js";

const router = express.Router();

router.post("/login", validate(loginSchema), authController.login);

router.post("/register", validate(registerSchema), authController.register);

export default router;
