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

// Example handler for the Razorpay webhook
export const handleRazorpayWebhook = async (req: Request) => {
  try {
    const webhookPayload: RazorpayWebhookPayload = await req.json();
    console.log("Received Razorpay Webhook:", webhookPayload);

    if (webhookPayload.event === 'payment.captured') {
      const { id: orderId, amount, currency, notes } = webhookPayload.payload.order;

      const order = {
        stripeId: orderId,
        eventId: notes.eventId || '',
        buyerId: notes.buyerId || '',
        totalAmount: amount ? (amount / 100).toString() : '0',
        createdAt: new Date(),
      };
      console.log(order);
      
      const newOrder = await createOrder(order);
      return NextResponse.json({ message: 'OK', order: newOrder });
    }

    return new Response('', { status: 200 });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return new Response('Webhook handling error', { status: 500 });
  }
};
