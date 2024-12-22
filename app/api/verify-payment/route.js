import crypto from 'crypto';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.NEON_DB_URL,
});

export async function POST(req) {
  try {
    const { paymentResponse, email } = await req.json();
    const { razorpay_subscription_id, razorpay_payment_id, razorpay_signature } = paymentResponse;

    // Verify the signature
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET);
    hmac.update(`${razorpay_subscription_id}|${razorpay_payment_id}`);
    const calculatedSignature = hmac.digest('hex');

    if (calculatedSignature !== razorpay_signature) {
      throw new Error('Invalid payment signature');
    }

    // Update user subscription in Neon DB
    const client = await pool.connect();
    await client.query(
      `UPDATE users
       SET subscription = TRUE, credits = 600
       WHERE email = $1`,
      [email]
    );
    client.release();

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
