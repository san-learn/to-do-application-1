import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/user-model.js";

import { createError } from "../utils/create-error.js";
import { loggingWithTime } from "../utils/logging-with-time.js";

async function getUser(request, response) {
  const { user } = request;

  response
    .status(200)
    .json({
      message: "Successfully got user",
      data: { user: { email: user.email } },
    });
}

async function signUp(request, response, next) {
  const { email, password } = request.body;

  try {
    if (!email || !password) {
      return next(createError(400, "Email and password are required"));
    }

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
        "] successfully signed up"
    );

    response.status(201).json({ message: "Successfully signed up" });
  } catch (error) {
    loggingWithTime(
      "Failed to sign up [email: " + email + "] [error: " + error.message + "]"
    );

    next(createError(500, "Something went wrong"));
  }
}

async function signIn(request, response, next) {
  const { email, password } = request.body;

  try {
    if (!email || !password) {
      return next(createError(400, "Email and password are required"));
    }

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
      { expiresIn: "7d" }
    );

    loggingWithTime(
      "User [id: " +
        user._id +
        "] [email: " +
        user.email +
        "] successfully signed in"
    );

    response
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ message: "Successfully signed in", data: { token: token } });
  } catch (error) {
    loggingWithTime(
      "Failed to sign in [email: " + email + "] [error: " + error.message + "]"
    );

    next(createError(500, "Something went wrong "));
  }
}

async function signOut(request, response, next) {
  const { user } = request;

  try {
    loggingWithTime(
      "User [id: " +
        user.id +
        "] [email: " +
        user.email +
        "] successfully signed out"
    );

    response
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ message: "Successfully signed out" });
  } catch (error) {
    loggingWithTime(
      "Failed to sign out [id: " +
        user.id +
        "] [email: " +
        user.email +
        "] [error: " +
        error.message +
        "]"
    );

    next(createError(500, "Something went wrong"));
  }
}

export { signUp, signIn, signOut, getUser };
