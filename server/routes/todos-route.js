import express from "express";

const todosRoutes = express.Router();

todosRoutes.get("/", (request, response, next) => {
  response.send("get-all-todos");
});

todosRoutes.post("/", (request, response, next) => {
  response.send("create-todo");
});

todosRoutes.put("/:todoId", (request, response, next) => {
  const { todoId } = request.params;

  response.send("update-todo " + todoId);
});

todosRoutes.delete("/:todoId", (request, response, next) => {
  const { todoId } = request.params;

  response.send("delete-todo " + todoId);
});

export { todosRoutes };
