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
    e.preventDefault(); // Prevent default form submission

    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    };

    try {
      // Call your backend to create an order and get the Razorpay order ID
      const razorpayOrderId = await checkoutOrder(order);

      // Configure Razorpay payment options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!, // Replace with your Razorpay key
        amount: Number(event.price) * 100, // Razorpay expects the amount in paise
        currency: 'INR',
        name: event.title,
        description: 'Event Ticket Purchase',
        order_id: razorpayOrderId, // The Razorpay order ID returned from the backend
        handler: function (response: any) {
          console.log('Payment successful', response);
          // Handle success (redirect or show a success message)
        },
        prefill: {
          email: 'user@example.com', // Prefill user email (optional)
        },
        theme: {
          color: '#1ab964',
        },
      };

      // Initialize Razorpay and open the payment modal
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error during checkout:', error);
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
