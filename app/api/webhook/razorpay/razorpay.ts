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
  const webhookPayload: RazorpayWebhookPayload = await req.json();

  if (webhookPayload.event === 'payment.captured') {
    const { id: orderId, amount, currency, notes } = webhookPayload.payload.order;

    // Prepare the order object
    const order = {
      paymentId: orderId, 
      eventId: notes.eventId || '',
      buyerId: notes.buyerId || '',
      totalAmount: amount ? (amount / 100).toString() : '0', // Convert paise to rupees
      createdAt: new Date(), 
    };
    console.log(order);
      

    // Create the order in the database
    const newOrder = await createOrder(order);
    return NextResponse.json({ message: 'OK', order: newOrder });
  }

  return new Response('', { status: 200 });
};
