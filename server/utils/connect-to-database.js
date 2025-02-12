import mongoose from "mongoose";

import { loggingWithTime } from "./logging-with-time.js";

let isConnected = false;

async function connectToDatabase() {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }

    const database = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = mongoose.connection.readyState === 1;

    if (isConnected) {
      loggingWithTime("Connected to MongoDB");
    }
  } catch (error) {
    loggingWithTime("Failed to connect to MongoDB: " + error.message);
  }
}

export { connectToDatabase };
