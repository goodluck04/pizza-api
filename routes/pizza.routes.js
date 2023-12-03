import express from "express";
import { createPizza, getAllPizzas } from "../controllers/pizza.controller.js";
const pizzaRouter = express.Router();

// pizza routes
pizzaRouter.get("/pizzas", getAllPizzas);
pizzaRouter.post("/pizza", createPizza);
export default pizzaRouter;
