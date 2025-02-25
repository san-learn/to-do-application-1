import useSWR from "swr";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CircleCheck, Plus, Trash } from "lucide-react";

import { fetcher } from "@/lib/fetcher";
import { TodoType } from "@/lib/types";
import {
  createTodoErrors,
  deleteUpdateTodoErrors,
  signOutUserErrors,
} from "@/lib/const";
import { cn } from "@/lib/utils";

import { EditTodo } from "@/components/edit-todo";
import { SignOutButton } from "@/components/sign-out-button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function HomePage() {
  const [formValues, setFormValues] = useState("");

  const navigate = useNavigate();

  const {
    data: todos,
    error,
    isLoading,
    mutate,
  } = useSWR(["/api/todos/", { method: "GET" }], fetcher);

  function handleChangeSetFormValues(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setFormValues(event.target.value);
  }

  async function handleClickSignOut() {
    try {
      await fetcher(["/api/authentication/sign-out", { method: "POST" }]);

      toast.success("Sign out successfully");

      navigate("/sign-in");
    } catch (error) {
      if (!signOutUserErrors.includes((error as Error).message)) {
        toast.error("Something went wrong");
      } else {
        toast.error((error as Error).message);
      }
    }
  }

  async function handleSubmitAddTodo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const title = formData.get("title")?.toString().trim();

    if (!title) {
      return toast.error("Title is required");
    }

    const optimisticTodo = {
      _id: Date.now().toString(),
      title: title + " is being added...",
      isCompleted: false,
    };

    async function addTodo() {
      try {
        const data = await fetcher([
          "/api/todos/",
          { method: "POST", body: JSON.stringify({ title: title }) },
        ]);

        setFormValues("");

        toast.success("Todo added successfully");

        return {
          message: todos.message,
          data: {
            user: todos.data.user,
            todos: [...todos.data.todos, data.data.todo],
          },
        };
      } catch (error) {
        if (!createTodoErrors.includes((error as Error).message)) {
          toast.error("Something went wrong");
        } else {
          toast.error((error as Error).message);
        }
      }
    }

    await mutate(addTodo, {
      optimisticData: {
        message: todos.message,
        data: {
          user: todos.data.user,
          todos: [...todos.data.todos, optimisticTodo],
        },
      },
      revalidate: true,
      rollbackOnError: true,
    });
  }

  async function handleClickDeleteTodo(todoId: string) {
    const optimisticTodos = todos.data.todos.map((todo: TodoType) => {
      return todo._id === todoId
        ? { ...todo, title: todo.title + " is being deleted..." }
        : todo;
    });

    async function deleteTodo() {
      try {
        await fetcher(["/api/todos/" + todoId, { method: "DELETE" }]);

        toast.success("Todo deleted successfully");

        return {
          message: todos.message,
          data: {
            user: todos.data.user,
            todos: todos.data.todos.filter((todo: TodoType) => {
              return todo._id !== todoId;
            }),
          },
        };
      } catch (error) {
        if (!deleteUpdateTodoErrors.includes((error as Error).message)) {
          toast.error("Something went wrong");
        } else {
          toast.error((error as Error).message);
        }
      }
    }

    await mutate(deleteTodo, {
      optimisticData: {
        message: todos.message,
        data: { user: todos.data.user, todos: optimisticTodos },
      },
      revalidate: true,
      rollbackOnError: true,
    });
  }

  async function handleClickCompleteTodo(todoId: string, isCompleted: boolean) {
    const optimisticTodos = todos.data.todos.map((todo: TodoType) => {
      return todo._id === todoId
        ? { ...todo, isCompleted: !isCompleted }
        : todo;
    });

    async function completeTodo() {
      try {
        await fetcher([
          "/api/todos/" + todoId,
          {
            method: "PUT",
            body: JSON.stringify({ isCompleted: !isCompleted }),
          },
        ]);

        toast.success(
          "Todo " +
            (isCompleted ? "uncompleted" : "completed") +
            " successfully"
        );

        return {
          message: todos.message,
          data: { user: todos.data.user, todos: optimisticTodos },
        };
      } catch (error) {
        if (!deleteUpdateTodoErrors.includes((error as Error).message)) {
          toast.error("Something went wrong");
        } else {
          toast.error((error as Error).message);
        }
      }
    }

    await mutate(completeTodo, {
      optimisticData: {
        message: todos.message,
        data: {
          user: todos.data.user,
          todos: optimisticTodos,
        },
      },
      revalidate: true,
      rollbackOnError: true,
    });
  }

  async function handleSubmitUpdateTodo(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const todoId = formData.get("todo-id")?.toString();
    const title = formData.get("title")?.toString().trim();

    if (!title) {
      return toast.error("Title is required");
    }

    const optimisticTodo = todos.data.todos.map((todo: TodoType) => {
      return todo._id === todoId
        ? { ...todo, title: todo.title + " is being updated..." }
        : todo;
    });

    async function updateTodo() {
      try {
        await fetcher([
          "/api/todos/" + todoId,
          { method: "PUT", body: JSON.stringify({ title: title }) },
        ]);

        toast.success("Todo updated successfully");

        return {
          message: todos.message,
          data: { user: todos.data.user, todos: optimisticTodo },
        };
      } catch (error) {
        if (!deleteUpdateTodoErrors.includes((error as Error).message)) {
          toast.error("Something went wrong");
        } else {
          toast.error((error as Error).message);
        }
      }
    }

    await mutate(updateTodo, {
      optimisticData: {
        message: todos.message,
        data: { user: todos.data.user, todos: optimisticTodo },
      },
      revalidate: true,
      rollbackOnError: true,
    });
  }

  if (error) {
    return <div>Failed to load {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen p-4">
      <div className="max-w-lg w-full flex flex-col gap-8 border rounded-md shadow-md p-8">
        <div className="flex items-center justify-between border-b pb-4">
          <p className="text-sm">
            Signed in as{" "}
            <span className="font-semibold">{todos.data.user.email}</span>
          </p>

          <SignOutButton handleClickSignOut={handleClickSignOut} />
        </div>

        <h1 className="text-4xl font-bold text-center text-primary">
          To Do Application
        </h1>

        <form
          onSubmit={handleSubmitAddTodo}
          className="flex gap-4 items-center"
        >
          <Input
            type="text"
            name="title"
            placeholder="Enter your task"
            value={formValues}
            onChange={handleChangeSetFormValues}
          />

          <Button type="submit">
            <Plus className="h-4 w-4" color="#FFF1F2" />
          </Button>
        </form>

        <div className="border border-input bg-transparent flex flex-col rounded-md">
          {todos.data.todos.length ? (
            <>
              {todos.data.todos.map((todo: TodoType, index: number) => {
                return (
                  <div
                    key={todo._id}
                    className={cn("flex h-10 items-center w-full", {
                      "border-b": index !== todos.data.todos.length - 1,
                    })}
                  >
                    <span
                      className={cn("flex-1 px-4", {
                        "line-through": todo.isCompleted,
                      })}
                    >
                      {todo.title}
                    </span>

                    <div className="px-4 flex gap-2">
                      <CircleCheck
                        onClick={() => {
                          handleClickCompleteTodo(todo._id, todo.isCompleted);
                        }}
                        className="h-4 w-4 fill-transparent hover:fill-green-500 transition-colors"
                      />
                      <Trash
                        onClick={() => {
                          handleClickDeleteTodo(todo._id);
                        }}
                        className="h-4 w-4 fill-transparent hover:fill-red-500 transition-colors"
                      />
                      <EditTodo
                        todo={todo}
                        handleSubmitUpdateTodo={handleSubmitUpdateTodo}
                      />
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="flex h-10 items-center w-full">
              <span className="flex-1 px-4">You have no tasks</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
