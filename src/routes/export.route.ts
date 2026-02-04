import { exportProjectCSV } from "#controllers/export.controller.js";
import { authMiddleware } from "#middlewares/auth.middleware.js";
import express from "express";

const router = express.Router();

router.get("/project/csv", authMiddleware, exportProjectCSV);

export default router;
