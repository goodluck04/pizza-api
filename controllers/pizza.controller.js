import prisma from "../utils/db.js";
import { ErrorHandler } from "../utils/error.js";

export const getAllPizzas = async (req, res, next) => {
  try {
    const pizzas = await prisma.pizza.findMany();
    return res.status(200).json(pizzas);
  } catch (error) {
    next(error);
  }
};
