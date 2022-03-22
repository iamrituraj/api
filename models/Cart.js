const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique:true },
    Products: [
      {
        product: [
          {
            product_id:{type:String},
            img: { type: String },
            title: { type: String },
            size: { type: String },
            color: { type: String },
            price:{type:Number},
          },
        ],
        quantity: {
          type: Number,
          defaullt: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
