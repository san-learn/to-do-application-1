import express from "express";

import {
  getAllTodos,
  createTodo,
  deleteTodo,
  getTodo,
  updateTodo,
} from "../controllers/todos-controller";

const todosRoutes = express.Router();

todosRoutes.get("/", getAllTodos);
todosRoutes.get("/:todoId", getTodo);

todosRoutes.post("/", createTodo);

todosRoutes.put("/:todoId", updateTodo);

todosRoutes.delete("/:todoId", deleteTodo);

export { todosRoutes };
