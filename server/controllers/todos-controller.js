import mongoose from "mongoose";

import { Todo } from "../models/todo-model.js";

import { loggingWithTime } from "../utils/logging-with-time.js";
import { createError } from "../utils/create-error.js";

async function getAllTodos(request, response, next) {
  const { user } = request;

  try {
    const todos = await Todo.find({ userId: user.id });

    loggingWithTime(
      "User [id: " +
        user.id +
        "] [email: " +
        user.email +
        "] successfully got all todos [total: " +
        todos.length +
        "]"
    );

    response
      .status(200)
      .json({ message: "Successfully got all todos", data: { todos: todos } });
  } catch (error) {
    loggingWithTime(
      "Failed to get all todos [userId: " +
        user.id +
        "] [userEmail: " +
        user.email +
        "] [error: " +
        error.message +
        "]"
    );

    next(createError(500, "Something went wrong"));
  }
}

async function getTodo(request, response, next) {
  const { user } = request;

  const { todoId } = request.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(todoId)) {
      loggingWithTime(
        "User [id: " +
          user.id +
          "] [email: " +
          user.email +
          "] tried to get todo [id: " +
          todoId +
          "] but failed because todo id is invalid"
      );

      return next(createError(400, "Todo does not exist"));
    }

    const todo = await Todo.findById(todoId);

    if (!todo) {
      loggingWithTime(
        "User [id: " +
          user.id +
          "] [email: " +
          user.email +
          "] tried to get todo [id: " +
          todoId +
          "] but failed because todo does not exist"
      );

      return next(createError(404, "Todo does not exist"));
    }

    if (todo.userId.toString() !== user.id) {
      loggingWithTime(
        "User [id: " +
          user.id +
          "] [email: " +
          user.email +
          "] tried to get todo [id: " +
          todoId +
          "] but failed because todo does not belong to user"
      );

      return next(createError(403, "Todo does not exist"));
    }

    loggingWithTime(
      "User [id: " +
        user.id +
        "] [email: " +
        user.email +
        "] successfully got todo [id: " +
        todoId +
        "]"
    );

    response
      .status(200)
      .json({ message: "Successfully got todo", data: { todo: todo } });
  } catch (error) {
    loggingWithTime(
      "Failed to get todo [userId: " +
        user.id +
        "] [userEmail: " +
        user.email +
        "] [todoId: " +
        todoId +
        "] [error: " +
        error.message +
        "]"
    );

    next(createError("500", "Something went wrong"));
  }
}

async function createTodo(request, response, next) {
  const { user } = request;

  const { title } = request.body;

  try {
    if (!title) {
      loggingWithTime(
        "Someone tried to create todo [id: " +
          user.id +
          "] [email: " +
          user.email +
          "] but failed because title is required"
      );

      return next(createError(400, "Title is required"));
    }

    const todo = await Todo.create({ userId: user.id, title: title });

    loggingWithTime(
      "User [id: " +
        user.id +
        "] [email: " +
        user.email +
        "] successfully created todo [id: " +
        todo._id +
        "]"
    );

    response
      .status(201)
      .json({ message: "Successfully created todo", data: { todo: todo } });
  } catch (error) {
    loggingWithTime(
      "Failed to create todo [userId: " +
        user.id +
        "] [userEmail: " +
        user.email +
        "] [error: " +
        error.message +
        "]"
    );

    next(createError(500, "Something went wrong"));
  }
}

async function updateTodo(request, response, next) {
  const { user } = request;

  const { todoId } = request.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(todoId)) {
      loggingWithTime(
        "User [id: " +
          user.id +
          "] [email: " +
          user.email +
          "] tried to update todo [id: " +
          todoId +
          "] but failed because todo id is invalid"
      );

      return next(createError(400, "Todo does not exist"));
    }

    const todo = await Todo.findById(todoId);

    if (!todo) {
      loggingWithTime(
        "User [id: " +
          user.id +
          "] [email: " +
          user.email +
          "] tried to update todo [id: " +
          todoId +
          "] but failed because todo does not exist"
      );

      return next(createError(404, "Todo does not exist"));
    }

    if (todo.userId.toString() !== user.id) {
      loggingWithTime(
        "User [id: " +
          user.id +
          "] [email: " +
          user.email +
          "] tried to update todo [id: " +
          todoId +
          "] but failed because todo does not belong to user"
      );

      return next(createError(403, "Todo does not exist"));
    }

    const { title, isCompleted } = request.body;

    todo.title = title || todo.title;
    todo.isCompleted =
      isCompleted !== undefined ? isCompleted : todo.isCompleted;

    await todo.save();

    loggingWithTime(
      "User [id: " +
        user.id +
        "] [email: " +
        user.email +
        "] successfully updated todo [id: " +
        todoId +
        "]"
    );

    response
      .status(200)
      .json({ message: "Successfully updated todo", data: { todo: todo } });
  } catch (error) {
    loggingWithTime(
      "Failed to update todo [userId: " +
        user.id +
        "] [userEmail: " +
        user.email +
        "] [todoId: " +
        todoId +
        "] [error: " +
        error.message +
        "]"
    );

    next(createError(500, "Something went wrong"));
  }
}

async function deleteTodo(request, response, next) {
  const { user } = request;

  const { todoId } = request.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(todoId)) {
      loggingWithTime(
        "User [id: " +
          user.id +
          "] [email: " +
          user.email +
          "] tried to delete todo [id: " +
          todoId +
          "] but failed because todo id is invalid"
      );

      return next(createError(400, "Todo does not exist"));
    }

    const todo = await Todo.findById(todoId);

    if (!todo) {
      loggingWithTime(
        "User [id: " +
          user.id +
          "] [email: " +
          user.email +
          "] tried to delete todo [id: " +
          todoId +
          "] but failed because todo does not exist"
      );

      return next(createError(404, "Todo does not exist"));
    }

    if (todo.userId.toString() !== user.id) {
      loggingWithTime(
        "User [id: " +
          user.id +
          "] [email: " +
          user.email +
          "] tried to delete todo [id: " +
          todoId +
          "] but failed because todo does not belong to user"
      );

      return next(createError(403, "Todo does not exist"));
    }

    await Todo.findByIdAndDelete(todoId);

    loggingWithTime(
      "User [id: " +
        user.id +
        "] [email: " +
        user.email +
        "] successfully deleted todo [id: " +
        todoId +
        "]"
    );

    response
      .status(200)
      .json({ message: "Successfully deleted todo", data: { todo: todo } });
  } catch (error) {
    loggingWithTime(
      "Failed to delete todo [userId: " +
        user.id +
        "] [userEmail: " +
        user.email +
        "] [todoId: " +
        todoId +
        "] [error: " +
        error.message +
        "]"
    );

    next(createError(500, "Something went wrong"));
  }
}

export { createTodo, deleteTodo, getAllTodos, getTodo, updateTodo };
