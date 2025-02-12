import express from "express";

import {
  signUp,
  signIn,
  signOut,
} from "../controllers/authentication-controller.js";

const authenticationRoutes = express.Router();

authenticationRoutes.post("/sign-up", signUp);
authenticationRoutes.post("/sign-in", signIn);
authenticationRoutes.post("/sign-out", signOut);

export { authenticationRoutes };
