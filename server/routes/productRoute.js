const express = require("express");
const {
  getAllProducts,
  addProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controller/productController");
const productRouter = express.Router();

// DESC : get all products
productRouter.get("/", getAllProducts);

// DESC : create a single product
productRouter.post("/", addProduct);

// DESC : get a single product
productRouter.get("/:id", getProductById);

// DESC : update a single product
productRouter.put("/:id", updateProductById);

// DESC : delete a single product
productRouter.delete("/:id", deleteProductById);

module.exports = productRouter;
