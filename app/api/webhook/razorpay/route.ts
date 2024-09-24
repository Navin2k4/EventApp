import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createOrder } from '@/lib/actions/order.action';

export async function POST(request: Request) {
  const body = await request.text();
  const razorpaySignature = request.headers.get('x-razorpay-signature') as string;
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
  
  const generatedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  if (generatedSignature !== razorpaySignature) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 400 });
  }

  const event = JSON.parse(body);

  if (event.event === 'payment.captured') {
    const { payment_id, amount, notes } = event.payload.payment.entity;

    const order = {
      paymentGateWayId: payment_id,
      eventId: notes.eventId,
      buyerId: notes.buyerId,
      totalAmount: (amount / 100).toString(),
      createdAt: new Date(),
    };

    const newOrder = await createOrder(order);
    return NextResponse.json({ message: 'OK', order: newOrder });
  }

  return new Response('', { status: 200 });
}
