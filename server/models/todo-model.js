import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  title: { type: String, required: [true, "Title is required"] },
  isCompleted: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", todoSchema);

export { Todo };
