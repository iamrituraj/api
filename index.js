const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const razorpayRoute = require("./routes/razorpay");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const { options } = require("./routes/razorpay");
const path = require("path");
// const stripe = require("stripe")(process.env.STRIPE_KEY);

dotenv.config();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", razorpayRoute);

app.use(
  express.static(path.join(__dirname, "/api/client/build"))
);

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/api/client/build", "index.html")
  );
});

app.listen(process.env.PORT || 8000, () => {
  console.log("server is running");
});
