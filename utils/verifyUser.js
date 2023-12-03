import jwt from "jsonwebtoken";
import { ErrorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(ErrorHandler(401, "Unauthorized"));
  // then verify token with
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(ErrorHandler(403, "Forbidden"));
 
    // send user to the next function
    req.user = user;
    // after verify the token execute the next function
    next();
  });
};