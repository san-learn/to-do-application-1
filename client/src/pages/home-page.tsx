import useSWR from "swr";
import toast from "react-hot-toast";
import { useState } from "react";

import { CircleCheck, CircleUserRound, Edit, Plus, Trash } from "lucide-react";

import { fetcher } from "@/lib/fetcher";
import { TodoType } from "@/lib/types";
import { createTodoErrors } from "@/lib/const";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function HomePage() {
  const [formValues, setFormValues] = useState("");

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

        return {
          message: todos.message,
          data: {
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
          todos: [...todos.data.todos, optimisticTodo],
        },
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
      <div className="max-w-lg w-full flex flex-col gap-6 border rounded-md shadow-md p-8">
        <CircleUserRound />

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
              {todos.data.todos.map((todo: TodoType, index: number) => (
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
                    <CircleCheck className="h-4 w-4 fill-transparent hover:fill-green-500 transition-colors" />
                    <Trash className="h-4 w-4 fill-transparent hover:fill-red-500 transition-colors" />
                    <Edit className="h-4 w-4 fill-transparent hover:fill-blue-500 transition-colors" />
                  </div>
                </div>
              ))}
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
