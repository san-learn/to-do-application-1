"use server";

import { SERVER_BASE_API_URL } from "@/lib/const";

type SignUpPreviousStateType = {
  success: boolean;
  data: { message: string };
};

type SignInPreviousStateType = {
  success: boolean;
  data: { message: string; data?: { token: string } };
};

export async function signUp(
  _previousState: SignUpPreviousStateType,
  formData: FormData
) {
  const formValues = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await fetch(
      SERVER_BASE_API_URL + "/api/authentication/sign-up",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { success: false, data: data };
    }

    return { success: true, data: data };
  } catch {
    return {
      success: false,
      data: { message: "Something went wrong" },
    };
  }
}

export async function signIn(
  _previousState: SignInPreviousStateType,
  formData: FormData
) {
  const formValues = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await fetch(
      SERVER_BASE_API_URL + "/api/authentication/sign-in",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formValues),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { success: false, data: data };
    }

    return { success: true, data: data };
  } catch {
    return {
      success: false,
      data: { message: "Something went wrong" },
    };
  }
}
