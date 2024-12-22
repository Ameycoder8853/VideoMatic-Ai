import { db } from "../lib/neon";  // Adjust import based on where your Neon DB instance is

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { paymentId, userId, userEmail } = req.body;

    // Verify the Razorpay payment on the backend
    const razorpaySignature = req.headers["x-razorpay-signature"];
    const razorpayPaymentId = paymentId;

    // Make sure the payment was successful (you can use Razorpay's API here to validate)
    if (!paymentId) {
      return res.status(400).json({ success: false, message: "Payment failed." });
    }

    try {
      // Assuming the Neon DB has a 'users' table with 'id', 'subscription', 'credits' columns
      const user = await db("users").where({ id: userId }).first();

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }

      // Update the user's subscription and credits
      await db("users")
        .where({ id: userId })
        .update({
          subscription: true,
          credits: 600,
        });

      return res.status(200).json({ success: true, message: "Subscription upgraded." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Something went wrong." });
    }
  } else {
    return res.status(405).json({ success: false, message: "Method not allowed." });
  }
}
