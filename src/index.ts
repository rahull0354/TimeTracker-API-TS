import DBConnect from "#config/DBConnect.js";
import express from "express";

import userRoutes from "#routes/user.routes.js";
import projectRoutes from "#routes/project.route.js";

const app = express();
const port = process.env.PORT ?? "9000";

app.use(express.json());

app.use("/user", userRoutes);
app.use("/project", projectRoutes);

app.listen(port, () => {
  DBConnect();
  console.log(`Server started on http://localhost:${port}`);
});
