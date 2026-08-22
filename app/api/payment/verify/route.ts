import { NextResponse } from 'next/server';
import crypto from 'node:crypto';

export async function POST(request: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) return NextResponse.json({ error: 'Payment gateway is not configured.' }, { status: 503 });
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) return NextResponse.json({ error: 'Missing payment fields.' }, { status: 400 });
    const expected = crypto.createHmac('sha256', secret).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex');
    const valid = crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(razorpay_signature));
    if (!valid) return NextResponse.json({ verified: false, error: 'Invalid payment signature.' }, { status: 400 });
    return NextResponse.json({ verified: true, paymentId: razorpay_payment_id, orderId: razorpay_order_id });
  } catch {
    return NextResponse.json({ error: 'Payment verification failed.' }, { status: 500 });
  }
}
