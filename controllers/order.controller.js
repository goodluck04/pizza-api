import prisma from "../utils/db.js";
import { ErrorHandler } from "../utils/error.js";


// export const createOrder = async (req, res, next) => {
  
//   const { userId, pizzaType, quantity, address, status, totalPrice } = req.body;
//   try {
   
//     // Create an order for the user
//     const createdOrder = await prisma.order.create({
//       data: {
//         userId: Number(userId),
//         pizzaType,
//         quantity,
//         address,
//         status: "pending",
//         totalPrice,
//       },
//     });
//     res
//       .status(201)
//       .json({ message: "Order created successfully", order: createOrder });
//   } catch (error) {
//     next(error);
//   }
// };


export const createOrder = async (req, res) => {
  const { user_id, quantity, address, totalPrice } = req.body;

  const newOrder = await prisma.order.create({
    data: {
      user_id: Number(user_id),
      quantity,
      address,
      totalPrice,
      pizzaType: "small",
      status: "pending",
    },
  });

  return res.json({
    status: 200,
    data: newOrder,
    msg: "Order Created successfully",
  });
};

export const fetchOrder = async (req, res) => {
  const orders = await prisma.order.findMany()
  return res.json({
    status: 200,
    data: orders,
  });
};

export const updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const { pizzaType, address } = req.body;

  await prisma.order.update({
    where: {
      id: Number(orderId),
    },
    data: {
      address,
      pizzaType,
    },
  });

  return res.json({ status: 200, msg: "order updated successfully" });
};

// delete a order by id
export const deleteOrder = async (req, res) => {
  const orderId = req.params.id;
  await prisma.order.delete({
    where: {
      id: Number(orderId),
    },
  });

  return res.json({ status: 200, message: "order deleted succesfully" });
};

// get a order by id
export const getOrder = async (req, res) => {
  const orderId = req.params.id;
  const order = await prisma.order.findFirst({
    where: {
      id: Number(orderId),
    },
  });

  return res.json({ status: 200, data: order });
};