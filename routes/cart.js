const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("./verifyToken");
const Cart = require("../models/Cart");
const router = require("express").Router();

// Add cart
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    return res.status(200).json(savedCart);
    
  } catch (err) {
    return res.status(500).json(err);
    
  }
});

//update cart by id

router.put("/:id", verifyToken, async (req, res) => {
  
  try {
    const updatedCart = await Cart.updateOne(
      { userId: req.params.id }, 
      { $addToSet: { Products :req.body}}                         
    )
    res.status(200).json(updatedCart);
} catch (err) {
    res.status(500).json(err);
    return
  }

  //  db.collection.update({_id: ObjectId("57315ba4846dd82425ca2408")},
  //                        myarray: { $not: { $elemMatch: {userId: ObjectId("570ca5e48dbe673802c2d035")} } } },
  //                       {
  //                          $addToSet : {
  //                                        myarray: {
  //                                                   userId: ObjectId("570ca5e48dbe673802c2d035"),
  //                                                   point: 10
  //                                                  }
  //                                       }
  //                        },
  //                       { multi: false, upsert: false});

  //  db.collection.update({
  //                         _id: ObjectId("57315ba4846dd82425ca2408"),
  //                          "myArray.userId": ObjectId("570ca5e48dbe673802c2d035")
  //                       },
  //                       { $set : { myArray.$.point: 10 } },
  //    { multi: false, upsert: false });
});

//delete Cart
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const res = await Cart.deleteOne({userId:req.params.id});
    return res.status(200).json("Cart has been deleted...");
  } catch (err) {
    return res.status(500).json(err);   
  }
});

// get user cart by id
router.get("/find/:userId", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    // if product is not present
    if (cart === null)
      res.status(404).json("cart is empty or not created");
    else res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all carts
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
