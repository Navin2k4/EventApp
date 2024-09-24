import React from 'react';
import { Button } from '../ui/button';
import { checkoutOrder } from '@/lib/actions/order.action';
import { IEvent } from '@/lib/database/models/event.model';

declare global {
  interface Window {
    Razorpay: any; // Declare Razorpay globally
  }
}

const Checkout = ({ event, userId }: { event: IEvent, userId: string }) => {
  const onCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    };
  
    try {
      // Fetch Razorpay order ID from backend
      const razorpayOrderId = await checkoutOrder(order);
  
      // Initialize Razorpay with key_id from env variable
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!, // Ensure this is set properly
        amount: Number(event.price) * 100,
        currency: 'INR',
        order_id: razorpayOrderId, // Order ID returned from the backend
        handler: function (response: any) {
          console.log('Payment successful', response);
        },
        prefill: {
          email: 'user@example.com',
        },
        theme: {
          color: '#1ab964',
        },
      };
  
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };
  
  return (
    <form onSubmit={onCheckout}>
      <Button type="submit" role="link" size="lg" className="bg-[#1ab964] hover:bg-[#18a258] sm:w-fit">
        {event.isFree ? 'Get Ticket' : 'Buy Ticket'}
      </Button>
    </form>
  );
};

export default Checkout;
