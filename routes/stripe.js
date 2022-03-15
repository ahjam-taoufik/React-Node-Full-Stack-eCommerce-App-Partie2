
const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Stripe = require('stripe');
require('dotenv').config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", null);
// router.post("/payment", (req, res) => {
   
//   stripe.charges.create(
//     {
//       source: req.body.tokenId,
//       amount: req.body.amount,
//     },
//     (stripeErr, stripeRes) => {
//       if (stripeErr) {
//         res.status(500).json(stripeErr);
//       } else {
//         res.status(200).json(stripeRes);
//       }
//     }
//   );
// });
 

 
router.post('/payment', async (req, res) => {
  const { token = {}, amount = 0 } = req.body; 
   
  if (!Object.keys(token).length || !amount) {
      res.status(400).json({ success: false });
  }

  const { id:customerId } = await stripe.customers
  .create({
      email: token.email,
      source: token.id, })
  .catch(e => {
      console.log(e); 
      return null; }) 

  if (!customerId) {
      res.status(500).json({ success: false });
      return; 
  }

  const invoiceId = `${token.email}-${Math.random().toString()}-${Date.now().toString()}`;

  const charge = await stripe.charges.create({
      amount: amount,
      currency: "USD", 
      customer: customerId,  
      receipt_email: token.email,
      description: "Donation",
  }, { idempotencyKey: invoiceId }).catch(e => { 
      console.log(e); 
      return null; 
  });

  if (!charge) {
      res.status(500).json({ success: false });
      return;
  };

  res.status(201).json({ success: true });
});


module.exports = router; 