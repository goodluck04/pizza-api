import express from "express";
import { getAllPizzas } from "../controllers/pizza.controller.js";
const pizzaRouter = express.Router();

// pizza routes
pizzaRouter.get("/pizzas", getAllPizzas);
export default pizzaRouter;
