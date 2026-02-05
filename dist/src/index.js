import DBConnect from "#config/DBConnect.js";
import express from "express";
import userRoutes from "#routes/user.routes.js";
import projectRoutes from "#routes/project.route.js";
import timeEntryRoutes from "#routes/timeEntry.route.js";
import exportRoutes from "#routes/export.route.js";
const app = express();
const port = process.env.PORT ?? "9000";
app.use(express.json());
app.use("/user", userRoutes);
app.use("/project", projectRoutes);
app.use("/timeEntry", timeEntryRoutes);
app.use("/export", exportRoutes);
app.listen(port, () => {
    DBConnect();
    console.log(`Server started on http://localhost:${port}`);
});
