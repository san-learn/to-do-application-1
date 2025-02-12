import jwt from "jsonwebtoken";

import { createError } from "./create-error.js";

async function verifyToken(request, response, next) {
  const token = request.cookies.token;

  if (!token) {
    return next(createError(401, "Unauthorized"));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    request.user = decodedToken;

    next();
  } catch (error) {
    return next(createError(401, "Unauthorized"));
  }
}

export { verifyToken };
