async function getAllTodos(request, response, next) {
  response.send("get-all-todos");
}

async function getTodo(request, response, next) {
  const { todoId } = request.params;

  response.send("get-todo " + todoId);
}

async function createTodo(request, response, next) {
  response.send("create-todo");
}

async function updateTodo(request, response, next) {
  const { todoId } = request.params;

  response.send("update-todo " + todoId);
}

async function deleteTodo(request, response, next) {
  const { todoId } = request.params;

  response.send("delete-todo " + todoId);
}

export { createTodo, deleteTodo, getAllTodos, getTodo, updateTodo };
