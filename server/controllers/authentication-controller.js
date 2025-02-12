import bcrypt from "bcryptjs";

import { User } from "../models/user-model.js";

import { connectToDatabase } from "../utils/connect-to-database.js";
import { createError } from "../utils/create-error.js";
import { loggingWithTime } from "../utils/logging-with-time.js";

async function signUp(request, response, next) {
  const { email, password } = request.body;

  if (!email || !password) {
    return next(createError(400, "Email and password are required"));
  }

  await connectToDatabase();

  const userExists = await User.exists({ email: email });

  if (userExists) {
    loggingWithTime(
      "Someone tried to sign up [email: " +
        email +
        "] but failed because user already exists"
    );

    return next(createError(400, "User already exists"));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ email: email, password: hashedPassword });

  loggingWithTime(
    "User [id: " +
      user._id +
      "] [email: " +
      user.email +
      "] created successfully"
  );

  response
    .status(201)
    .json({ message: "User created successfully", data: user });
}

async function signIn(request, response, next) {
  response.send("sign-in");
}

async function signOut(request, response, next) {
  response.send("sign-out");
}

export { signUp, signIn, signOut };
