// dotenv will protect sensitive data
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
// import auth router
import authRouter from "./routes/auth.routes.js";
import { ErrorHandler } from "./utils/error.js";
import pizzaRouter from "./routes/pizza.routes.js";
import orderRouter from "./routes/order.routes.js";

// defined the port
const PORT = process.env.PORT || 8080;

// create app
const app = express();

//  by default we are not allowed send json data to the server
// so we use middleware to parse json
app.use(express.json());

// cookie parsing with this
app.use(cookieParser());

// cors
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

// listing to port 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// testing api
app.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

// routes for auth,pizza and order
app.use("/api", authRouter);
app.use("/api", pizzaRouter);
app.use("/api", orderRouter);


// Error handling middleware 
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    // Handle JSON parsing error
    return next(ErrorHandler(400, "Invalid JSON syntax"));
  }
  // Forward other errors to the next middleware
  next(err);
});

// adding middleware for handling error as next()
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
  });
});
