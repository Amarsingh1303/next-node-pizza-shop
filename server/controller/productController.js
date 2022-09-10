const Product = require("../models/Product");

// Method : GET
// DESC : get all products
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Method : POST
// DESC : create a single product
const addProduct = async (req, res, next) => {
  const createdProduct = new Product(req.body);
  try {
    await createdProduct.save();
    res.status(201).json({ createdProduct });
  } catch (error) {
    console.log("error", error);
    res.status(404).json({ error });
  }
};

// Method : GET
// DESC : get a single product
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Method : PUT
// DESC : update a single product

const updateProductById = async (req, res, next) => {
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
};

// Method : DELETE
// DESC : delete a single product
const deleteProductById = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getAllProducts = getAllProducts;
exports.addProduct = addProduct;
exports.getProductById = getProductById;
exports.updateProductById = updateProductById;
exports.deleteProductById = deleteProductById;
