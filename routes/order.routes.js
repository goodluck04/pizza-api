import express from "express";
import {
  createOrder,
  deleteOrder,
  fetchAllOrder,
  updateOrder,
  getOrder,
} from "../controllers/order.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const orderRouter = express.Router();

// pizza routes
orderRouter.post("/order", verifyToken, createOrder);
orderRouter.get("/orders", verifyToken, fetchAllOrder);
orderRouter.put("/order/:id", verifyToken, updateOrder);
orderRouter.delete("/order/:id", verifyToken, deleteOrder);
orderRouter.get("/order/:id", getOrder);
export default orderRouter;
