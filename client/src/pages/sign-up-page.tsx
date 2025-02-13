import { useActionState, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signUp } from "@/actions/user-action";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignUpPage() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [state, formAction, isPending] = useActionState(signUp, {
    success: false,
    data: { message: "" },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        navigate("/sign-in");
      }, 3000);
    }
  }, [navigate, state.success]);

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
        action={formAction}
        className="flex flex-col gap-6 max-w-xl w-full p-8 border rounded-md shadow-md"
      >
        {state.data.message && state.success && (
          <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded relative">
            <span className="block sm:inline">{state.data.message}</span>
            <span>
              You will be redirected to the sign in page in a few seconds
            </span>
          </div>
        )}

        {state.data.message && !state.success && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{state.data.message}</span>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label>Email:</Label>

          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            disabled={isPending}
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
            disabled={isPending}
            value={formValues.password}
            onChange={handleChangeSetFormValues}
          />
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Signing Up..." : "Sign Up"}
        </Button>

        <span>
          Already have an account?{" "}
          <Link to="/sign-in" className="hover:underline">
            Sign In
          </Link>
        </span>
      </form>
    </div>
  );
}
