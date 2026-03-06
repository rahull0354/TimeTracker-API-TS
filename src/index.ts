import DBConnect from "#config/DBConnect.js";
import express from "express";
import cors from "cors";

import userRoutes from "#routes/user.routes.js";
import projectRoutes from "#routes/project.route.js";
import timeEntryRoutes from "#routes/timeEntry.route.js";
import exportRoutes from "#routes/export.route.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/project", projectRoutes);
app.use("/timeEntry", timeEntryRoutes);
app.use("/export", exportRoutes);

const PORT = process.env.PORT;

// only for local testing
// app.listen(PORT, () => {
//     console.log(`server started on http://localhost:${PORT}`);
// })

// connect DB once when serverless function initializes
DBConnect();

export default app;
