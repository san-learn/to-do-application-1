import mongoose from "mongoose";

import { loggingWithTime } from "./logging-with-time.js";

async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    loggingWithTime("MongoDB [status: already connected]");

    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    loggingWithTime("MongoDB [status: connected]");

    mongoose.connection.on("disconnected", () => {
      loggingWithTime(
        "MongoDB [status: connection lost and trying to reconnect]"
      );

      connectToDatabase();
    });

    mongoose.connection.on("error", (error) => {
      loggingWithTime("MongoDB [error: " + error.message + "]");
    });
  } catch (error) {
    loggingWithTime(
      "MongoDB [status: failed to connect] [error: " + error.message + "]"
    );

    process.exit(1);
  }
}

export { connectToDatabase };
