const Order = require("../models/Order");

// Order
// Method : GET
// DESC : get all Orders
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Method : POST
// DESC : create a single Order
const addOrder = async (req, res, next) => {
  const createdOrder = new Order(req.body);
  try {
    await createdOrder.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.log("error", error);
    res.status(404).json({ error });
  }
};

// Method : GET
// DESC : get a single Order
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Method : PUT
// DESC : update a single Order
const updateOrderById = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Method : DELETE
// DESC : delete a single Order
const deleteOrderById = async (req, res, next) => {
  try {
    const deletedProduct = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getAllOrders = getAllOrders;
exports.addOrder = addOrder;
exports.getOrderById = getOrderById;
exports.updateOrderById = updateOrderById;
exports.deleteOrderById = deleteOrderById;
