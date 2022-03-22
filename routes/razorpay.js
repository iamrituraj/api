const {  verifyTokenAndAuthorization, verifyToken } = require("./verifyToken");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const CryptoJS = require("crypto-js");
const router = require("express").Router();



router.post("/payment", verifyToken,async(req, res) => {

  
  const bytes = CryptoJS.AES.decrypt(
    req.body.amount,
    process.env.PASS_SEC
  );

  var decrypted_amount = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  const payment_capture = 1;
  const amount = decrypted_amount * 100;
  const currency = req.body.currency;
  
const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});
  

  const options = {
    amount:amount,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);

 let text = response.amount;
    console.log(text, text);
 const encrypt = CryptoJS.AES.encrypt(
   text.toString(),
   process.env.PASS_SEC
 ).toString();
    console.log(encrypt,"encrypt");

      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: encrypt,
      });

  } catch (err) {
    console.log(err);
    res.status(502).json(err);
    return;
  }
});

module.exports = router;
