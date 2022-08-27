const express = require("express");
const {
  getAllOrders,
  addOrder,
  getOrderById,
  updateOrderById,
  deleteOrderById,
} = require("../controller/orderController");
const orderRouter = express.Router();

// DESC : get all Orders
orderRouter.get("/", getAllOrders);

// DESC : create a single Order
orderRouter.post("/", addOrder);

// DESC : get a single Order
orderRouter.get("/:id", getOrderById);

// DESC : update a single Order

orderRouter.put("/:id", updateOrderById);

// DESC : delete a single Order
orderRouter.delete("/:id", deleteOrderById);

module.exports = orderRouter;
