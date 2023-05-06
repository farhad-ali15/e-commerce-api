// import Stripe from "stripe";

// export const createNewPayment = async (req, res, next) => {
//   const KEY = process.env.STRIPE_KEY;
//   const stripe = new Stripe(KEY);

//   let { amount, id } = req.body;
//   try {
//     const payment = await stripe.paymentIntents.create({
//       amount,
//       currency: "USD",
//       description: "ABC INC.",
//       source: id,
//     });
//     console.log("Payment", payment);
//     res.json({
//       message: "Payment successful",
//       success: true,
//     });
//   } catch (error) {
//     console.log("Error", error);
//     res.json({
//       message: "Payment failed",
//       success: false,
//     });
//   }
// };

// This is your test secret API key.
import Stripe from "stripe";
const YOUR_DOMAIN = "http://localhost:3000/pay";
export const createNewPayment = async (req, res) => {
  const KEY = process.env.STRIPE_KEY;
  const stripe = new Stripe(KEY);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1N4p5aCrAYt82Oxy4QIo69l9",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
};
