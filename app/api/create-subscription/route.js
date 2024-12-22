// pages/api/create-subscription.js
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { customerEmail, customerName } = req.body;

    try {
      // Create a customer in Razorpay
      const customer = await razorpay.customers.create({
        name: customerName,
        email: customerEmail,
      });

      // Create a subscription for the customer
      const subscription = await razorpay.subscriptions.create({
        plan_id: process.env.RAZORPAY_PLAN_ID,
        customer_notify: 1,
        total_count: 12, // Number of billing cycles
        customer_id: customer.id,
      });

      res.status(200).json(subscription);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
