import mongoose from "mongoose";

let isConnected = false;

async function connectToDatabase() {
  try {
    if (isConnected) {
      console.log("Already connected to MongoDB");

      return;
    }

    const database = await mongoose.connect(process.env.MONGO_URI);

    isConnected = database.connections[0].readyState;

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
}

export { connectToDatabase };
