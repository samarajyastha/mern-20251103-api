import express from "express";

import { ROLE_ADMIN } from "../constants/roles.js";
import { userSchema } from "../libs/schemas/user.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import userController from "../controllers/user.controller.js";
import validate from "../middlewares/validator.js";

const router = express.Router();

router.get("/", roleBasedAuth(ROLE_ADMIN), userController.getUsers);

router.post(
  "/",
  roleBasedAuth(ROLE_ADMIN),
  validate(userSchema),
  userController.createUser
);

router.patch("/profile-image", userController.updateProfileImage);

export default router;
