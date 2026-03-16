import express from "express";
import {
  deleteUser,
  getProfileDetails,
  loginUser,
  registerUser,
  updateUser,
} from "#controllers/user.controller.js";
import { authMiddleware } from "#middlewares/auth.middleware.js";
import {
  forgotPassword,
  resetPassword,
  verifyResetToken,
} from "#controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfileDetails);
router.delete("/delete", authMiddleware, deleteUser);
router.patch("/update", authMiddleware, updateUser);

//password expiration routes
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-token", verifyResetToken);
router.post("/reset-password", resetPassword);

export default router;
