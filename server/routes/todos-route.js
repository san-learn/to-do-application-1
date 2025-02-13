import express from "express";

import { verifyToken } from "../utils/verify-token.js";

import {
  getAllTodos,
  createTodo,
  deleteTodo,
  getTodo,
  updateTodo,
} from "../controllers/todos-controller.js";

const todosRoutes = express.Router();

todosRoutes.get("/", verifyToken, getAllTodos);
todosRoutes.get("/:todoId", verifyToken, getTodo);

todosRoutes.post("/", verifyToken, createTodo);

todosRoutes.put("/:todoId", verifyToken, updateTodo);

todosRoutes.delete("/:todoId", verifyToken, deleteTodo);

export { todosRoutes };
