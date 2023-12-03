import prisma from "../utils/db.js";
import { ErrorHandler } from "../utils/error.js";

// create order
export const createOrder = async (req, res, next) => {
  try {
    const { user_id, quantity, address, totalPrice, pizzaType } = req.body;

    // validate the body data
    if (!(user_id && quantity && address && totalPrice && pizzaType)) {
      return next(ErrorHandler(400, "All fields are required!"));
    }

    // chech pizza type exist or not
    const existingPizza = await prisma.pizza.findUnique({
      where: {
        type: pizzaType,
      },
    });

    // if not exist
    if (!existingPizza) {
      return next(
        ErrorHandler(404, `Pizza type '${pizzaType}' does not exist.`)
      );
    }
    // if pazza type exist save the new order
    const newOrder = await prisma.order.create({
      data: {
        user_id: Number(user_id),
        quantity,
        address,
        totalPrice,
        pizzaType,
        status: "pending",
      },
    });
    return res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

// get all orders
export const fetchAllOrder = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany();
    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

// update the order by id
export const updateOrder = async (req, res, next) => {
  try {
    // get the id of from that particular order
    const orderId = req.params.id;
    // check whether order exist in db or not
    const isOrderExist = await prisma.order.findUnique({
      where: {
        id: Number(orderId),
      },
    });
    
    if (!isOrderExist) {
      // Handle the error when the user is not found
      return next(ErrorHandler(404, `Order not found`));
    }
    // get the body to update
    const { quantity, address, totalPrice, pizzaType } = req.body;
    // validate the body data
    if (!(quantity && address && totalPrice && pizzaType)) {
      return next(ErrorHandler(400, "All fields are required!"));
    }

    // chech pizza type exist or not
    const existingPizza = await prisma.pizza.findUnique({
      where: {
        type: pizzaType,
      },
    });

    // if not exist
    if (!existingPizza) {
      return next(
        ErrorHandler(404, `Pizza type '${pizzaType}' does not exist.`)
      );
    }

    await prisma.order.update({
      where: {
        id: Number(orderId),
      },
      data: {
        address,
        pizzaType,
        totalPrice,
        pizzaType,
      },
    });

    return res.status(201).json("order updated successfully");
  } catch (error) {
    next(error);
  }
};

// delete a order by id
export const deleteOrder = async (req, res, next) => {
  try {
    // get the id of the order to delete
    const orderId = req.params.id;
    // check if order exist or not
    const isOrderExist = await prisma.order.findUnique({
      where: {
        id: Number(orderId),
      },
    });

    if (!isOrderExist) {
      // Handle the error when the user is not found
      return next(ErrorHandler(404, `Order not found`));
    }
    await prisma.order.delete({
      where: {
        id: Number(orderId),
      },
    });

    return res.status(200).json("order cancel succesfully");
  } catch (error) {
    next(error);
  }
};

// get a order by id
export const getOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    // check if order exist or not
    const isOrderExist = await prisma.order.findUnique({
      where: {
        id: Number(orderId),
      },
    });

    if (!isOrderExist) {
      // Handle the error when the user is not found
      return next(ErrorHandler(404, `Order not found with`));
    }
    const order = await prisma.order.findFirst({
      where: {
        id: Number(orderId),
      },
    });

    return res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};
