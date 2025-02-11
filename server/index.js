import express from "express";

import { authenticationRoutes } from "./routes/authentication-route.js";
import { todosRoutes } from "./routes/todos-route.js";

const application = express();

const PORT = 3000;

application.use(express.json());

application.use("/api/authentication", authenticationRoutes);
application.use("/api/todos", todosRoutes);

application.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
