import express from "express";

import { verifyToken } from "../utils/verify-token.js";

import {
  signUp,
  signIn,
  signOut,
  getUser,
} from "../controllers/authentication-controller.js";

const authenticationRoutes = express.Router();

authenticationRoutes.get("/get-user", verifyToken, getUser);
authenticationRoutes.post("/sign-up", signUp);
authenticationRoutes.post("/sign-in", signIn);
authenticationRoutes.post("/sign-out", verifyToken, signOut);

export { authenticationRoutes };
