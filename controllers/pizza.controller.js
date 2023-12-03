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

// only for testing purpose 
// create pizza its unsecured 
export const createPizza = async (req, res, next) => {
  try {
    const { type, description, price} = req.body;

    

    const pizza = await prisma.pizza.create({
      data:{
        type,
        description,
        price
      }
    });
    return res.status(200).json(pizza);
  } catch (error) {
    next(error);
  }
};
