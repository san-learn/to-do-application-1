"use server";

type SignUpPreviousStateType = {
  success: boolean;
  data: { message: string };
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
      "http://localhost:3000/api/authentication/sign-up",
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
  } catch (error) {
    console.log(error);

    return {
      success: false,
      data: { message: "Something went wrong" },
    };
  }
}
