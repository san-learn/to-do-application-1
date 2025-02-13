import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignInPage() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  function handleChangeSetFormValues(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div className="h-screen flex justify-center items-center p-4">
      <form
        action=""
        className="flex flex-col gap-6 max-w-xl w-full p-8 border rounded-md shadow-md"
      >
        <div className="flex flex-col gap-2">
          <Label>Email:</Label>

          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formValues.email}
            onChange={handleChangeSetFormValues}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Password:</Label>

          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formValues.password}
            onChange={handleChangeSetFormValues}
          />
        </div>

        <Button type="submit">Sign In</Button>

        <span>
          Don&apos;t have an account?{" "}
          <Link to="/sign-up" className="hover:underline">
            Sign Up
          </Link>
        </span>
      </form>
    </div>
  );
}
