import {
  applyBreakToTimer,
  completeTimeEntry,
  getMyTimeEntries,
  getTimeEntriesForProject,
  resumeTimer,
  startTimeEntry,
  stopTimeEntry,
} from "#controllers/timeEntry.controller.js";
import { authMiddleware } from "#middlewares/auth.middleware.js";
import express from "express";

const router = express.Router();

router.post("/startTimeEntry/:projectId", authMiddleware, startTimeEntry);
router.post("/stopTimeEntry/:timeEntryId", authMiddleware, stopTimeEntry);
router.post("/break/:timeEntryId", authMiddleware, applyBreakToTimer);
router.post("/resume/:timeEntryId", authMiddleware, resumeTimer);
router.post("/complete/:timeEntryId", authMiddleware, completeTimeEntry);

// fetch time entries of a particular project
router.get("/myEntries", authMiddleware, getMyTimeEntries)
router.get("/project/:projectId", authMiddleware, getTimeEntriesForProject);

export default router;
