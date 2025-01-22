import express from "express";
import {
  adminOrders,
  placeOrder,
  updateStatus,
  userOrders,
  verifyOrder,
} from "../Controllers/orderController.js";
import authMiddleware from "../Middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userOrders", authMiddleware, userOrders);
orderRouter.post("/adminOrders", adminOrders);
orderRouter.post("/status", updateStatus);

export default orderRouter;
