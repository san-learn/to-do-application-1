import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    .json({ message: "User created successfully", data: { user: user } });
}

async function signIn(request, response, next) {
  const { email, password } = request.body;

  if (!email || !password) {
    return next(createError(400, "Email and password are required"));
  }

  await connectToDatabase();

  const user = await User.findOne({ email: email });

  if (!user) {
    loggingWithTime(
      "Someone tried to sign in [email: " +
        email +
        "] but failed because user does not exist"
    );

    return next(createError(400, "Invalid credentials"));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    loggingWithTime(
      "Someone tried to sign in [id: " +
        user._id +
        "] [email: " +
        user.email +
        "] but failed because password is invalid"
    );

    return next(createError(400, "Invalid credentials"));
  }

  const token = jwt.sign(
    { id: user._id, email: email },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  loggingWithTime(
    "User [id: " +
      user._id +
      "] [email: " +
      user.email +
      "] signed in successfully"
  );

  response
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "User signed in successfully", data: { token: token } });
}

async function signOut(request, response, next) {
  const { id, email } = request.user;

  loggingWithTime(
    "User [id: " + id + "] [email: " + email + "] signed out successfully"
  );

  response
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "User signed out successfully" });
}

export { signUp, signIn, signOut };
