import express from "express";
import userRoutes from "#routes/user.routes.js";
import projectRoutes from "#routes/project.route.js";
import timeEntryRoutes from "#routes/timeEntry.route.js";
import exportRoutes from "#routes/export.route.js";

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/user", userRoutes);
app.use("/project", projectRoutes);
app.use("/timeEntry", timeEntryRoutes);
app.use("/export", exportRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

export default app;
