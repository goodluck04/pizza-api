// dotenv will protect sensitive data
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
// import auth router
import authRouter from "./routes/auth.routes.js";

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
app.get("/test", (req, res, next) => {
  res.status(200).json({
      success: true,
      message: "API is working",
  })
})


// routes for authentication
app.use("/api/v1/auth", authRouter);

