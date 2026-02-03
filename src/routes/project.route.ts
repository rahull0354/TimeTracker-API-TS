import { createProject } from '#controllers/project.controller.js';
import { authMiddleware } from '#middlewares/auth.middleware.js';
import express from 'express';

const router = express.Router()

router.post("/create", authMiddleware, createProject)

export default router