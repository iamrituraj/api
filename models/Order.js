const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true ,unique:true},
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          defaullt: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, requires: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
