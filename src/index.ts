import DBConnect from "#config/DBConnect.js";
import express from "express";

import userRoutes from "#routes/user.routes.js";
import projectRoutes from "#routes/project.route.js";
import timeEntryRoutes from "#routes/timeEntry.route.js";
import exportRoutes from "#routes/export.route.js";

// Initialize Express app
const app = express();
const port = process.env.PORT ?? "9000";

// Middleware
app.use(express.json());

// Routes
app.use("/user", userRoutes);
app.use("/project", projectRoutes);
app.use("/timeEntry", timeEntryRoutes);
app.use("/export", exportRoutes);

// Initialize database connection
DBConnect();

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// For local development only
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
}

// Export for Vercel serverless deployment
// This is the primary export that Vercel looks for
export default app;
