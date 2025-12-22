import express from "express";

import { ROLE_ADMIN } from "../constants/roles.js";
import { updateRolesSchema, userSchema } from "../libs/schemas/user.js";
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

// GET /api/users/me
router.get("/me", userController.getLoggedInUser);

// GET /api/users/:id
router.get("/:id", roleBasedAuth(ROLE_ADMIN), userController.getUserById);

router.put("/:id", userController.updateUser);

router.delete("/:id", roleBasedAuth(ROLE_ADMIN), userController.deleteUser);

// PUT /api/users/:id/roles
router.put(
  "/:id/roles",
  roleBasedAuth(ROLE_ADMIN),
  validate(updateRolesSchema),
  userController.updateUserRoles
);

export default router;
