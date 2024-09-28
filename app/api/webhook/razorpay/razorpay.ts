import { createOrder } from '@/lib/actions/order.action';
import { NextResponse } from 'next/server';

// Assuming you have a type for metadata
type RazorpayWebhookPayload = {
  event: string;
  payload: {
    order: {
      id: string;
      amount: number;
      currency: string;
      notes: {
        eventId: string;
        buyerId: string;
      };
    };
  };
};

export const handleRazorpayWebhook = async (req: Request) => {
  const webhookPayload: RazorpayWebhookPayload = await req.json();
  
  if (webhookPayload.event === 'payment.captured') {
    const { id: orderId, amount, notes } = webhookPayload.payload.order;
    const order = {
      paymentId: orderId, 
      eventId: notes.eventId || '',
      buyerId: notes.buyerId || '',
      totalAmount: amount ? (amount / 100).toString() : '0', // Convert paise to rupees
      createdAt: new Date(), 
    };
    return NextResponse.json({ message: 'OK', order: order });
  }

  return new Response('', { status: 200 });
};
