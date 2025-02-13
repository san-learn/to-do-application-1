import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { authenticationRoutes } from "./routes/authentication-route.js";
import { todosRoutes } from "./routes/todos-route.js";

import { connectToDatabase } from "./utils/connect-to-database.js";
import { loggingWithTime } from "./utils/logging-with-time.js";

const application = express();

const PORT = 3000;

dotenv.config();

application.use(express.json());
application.use(cookieParser());

application.use("/api/authentication", authenticationRoutes);
application.use("/api/todos", todosRoutes);

application.use((error, request, response, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Something went wrong";

  response.status(statusCode).json({ message: message });
});

async function startApplication() {
  try {
    await connectToDatabase();

    application.listen(PORT, () => {
      loggingWithTime("Server [status: started] [port: " + PORT + "]");
    });
  } catch (error) {
    loggingWithTime(
      "Server [status: failed to start] [error: " + error.message + "]"
    );
  }
}

startApplication();
