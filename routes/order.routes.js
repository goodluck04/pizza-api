import express from "express";
import { createOrder, deleteOrder, fetchOrder, updateOrder, getOrder } from "../controllers/order.controller.js";
const orderRouter = express.Router();

// pizza routes
orderRouter.post("/order", createOrder);
orderRouter.get("/orders", fetchOrder);
orderRouter.put("/order/:id", updateOrder);
orderRouter.delete("/order/:id", deleteOrder);
orderRouter.get("/order/:id", getOrder);
export default orderRouter;
