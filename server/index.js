const express = require("express");
const connectDB = require("./db/index");
const bodyParser = require("body-parser");
const productRouter = require("./routes/productRoute");
const orderRouter = require("./routes/orderRoute");
require("dotenv").config();
const PORT = 5000;

const app = express();
connectDB();

app.use(bodyParser.json());

app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

app.listen(process.env.PORT || PORT, () =>
  console.log(`server running on port ${PORT}`)
);
