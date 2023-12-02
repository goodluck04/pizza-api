import express from "express";
import { signup } from "../controllers/auth.controller.js";

const authRouter = express.Router();

// create sign up router
authRouter.post("/signup", signup);

export default authRouter;
