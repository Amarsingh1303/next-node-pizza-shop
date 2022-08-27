const express = require("express");
const connectDB = require("./db/index");
const bodyParser = require("body-parser");
const Product = require("./models/Product");
const Order = require("./models/Order");
require("dotenv").config();
const PORT = 5000;

const app = express();
connectDB();

app.use(bodyParser.json());
// Product
// Method : GET
// DESC : get all products
app.get("/api/product", async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Method : POST
// DESC : create a single product
app.post("/api/product", async (req, res, next) => {
  const createdProduct = new Product(req.body);
  try {
    await createdProduct.save();
    res.status(200).json({ createdProduct });
  } catch (error) {
    console.log("error", error);
    res.status(404).json({ error });
  }
});

// Method : GET
// DESC : get a single product
app.get("/api/product/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Method : PUT
// DESC : update a single product

app.put("/api/product/:id", async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Method : DELETE
// DESC : delete a single product
app.delete("/api/product/:id", async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Order
// Method : GET
// DESC : get all Orders
app.get("/api/orders", async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Method : POST
// DESC : create a single Order
app.post("/api/order", async (req, res, next) => {
  const createdOrder = new Order(req.body);
  try {
    await createdOrder.save();
    res.status(200).json({ createdOrder });
  } catch (error) {
    console.log("error", error);
    res.status(404).json({ error });
  }
});

// Method : POST
// DESC : create a single product
app.post("/api/product", async (req, res, next) => {
  const createdProduct = new Product(req.body);
  try {
    await createdProduct.save();
    res.status(200).json({ createdProduct });
  } catch (error) {
    console.log("error", error);
    res.status(404).json({ error });
  }
});

// Method : GET
// DESC : get a single Order
app.get("/api/order/:id", async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Method : PUT
// DESC : update a single Order

app.put("/api/order/:id", async (req, res, next) => {
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
});

// Method : DELETE
// DESC : delete a single Order
app.delete("/api/product/:id", async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.listen(process.env.PORT || PORT, () =>
  console.log(`server running on port ${PORT}`)
);
