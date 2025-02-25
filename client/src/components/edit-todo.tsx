import { useState } from "react";
import { Edit } from "lucide-react";

import { TodoType } from "@/lib/types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type EditTodoProps = {
  todo: TodoType;
  handleSubmitUpdateTodo: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<string | undefined>;
};

export function EditTodo({ todo, handleSubmitUpdateTodo }: EditTodoProps) {
  const [title, setTitle] = useState(todo.title);

  function handleChangesetTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit className="h-4 w-4 fill-transparent hover:fill-blue-500 transition-colors" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="space-y-2">
          <DialogTitle>Edit todo</DialogTitle>

          <DialogDescription>
            Edit the details of your todo. You can change the title or mark it
            as completed.
          </DialogDescription>
        </DialogHeader>

        <DialogTrigger asChild>
          <form
            onSubmit={handleSubmitUpdateTodo}
            className="flex flex-col gap-4"
          >
            <Label>Previous title: {todo.title}</Label>

            <input type="hidden" id="todo-id" name="todo-id" value={todo._id} />

            <Input
              id="title"
              name="title"
              value={title}
              placeholder="Input new title"
              onChange={handleChangesetTitle}
              className="col-span-3"
            />

            <DialogFooter>
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </DialogTrigger>
      </DialogContent>
    </Dialog>
  );
}
