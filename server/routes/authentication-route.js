import express from "express";

const authenticationRoutes = express.Router();

authenticationRoutes.post("/sign-up", (request, response, next) => {
  response.send("sign-up");
});

authenticationRoutes.post("/sign-in", (request, response, next) => {
  response.send("sign-in");
});

authenticationRoutes.post("/sign-out", (request, response, next) => {
  response.send("sign-out");
});

export { authenticationRoutes };
