import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
  try {
    const { amount, currency = 'INR', receipt } = await request.json();
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) return NextResponse.json({ error: 'Payment gateway is not configured.' }, { status: 503 });
    if (!Number.isFinite(amount) || amount <= 0) return NextResponse.json({ error: 'Invalid amount.' }, { status: 400 });
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await razorpay.orders.create({ amount: Math.round(amount * 100), currency, receipt: receipt || `order_${Date.now()}` });
    return NextResponse.json({ id: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to create payment order.' }, { status: 500 });
  }
}
