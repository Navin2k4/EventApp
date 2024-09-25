import React, { useEffect } from 'react';
import { IEvent } from '@/lib/database/models/event.model';
import { Button } from '../ui/button';
import { checkoutOrder } from '@/lib/actions/order.action';

// Interface for the Razorpay payment response
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature?: string; // Optional field for signature verification
}

declare global {
  interface Window {
    Razorpay: any; // Declare Razorpay on the window object
  }
}

const Checkout = ({ event, userId }: { event: IEvent, userId: string }) => {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  const onCheckout = async () => {
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId
    };

    // Create the order and get Razorpay options from the backend
    const res = await checkoutOrder(order);
    const { orderId, amount, currency, key } = res;

    // Load Razorpay script dynamically
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const options = {
        key,
        amount,
        currency,
        order_id: orderId,
        name: 'Event Payment',
        description: `Payment for ${event.title}`,
        handler: function (response: RazorpayResponse) {
          console.log('Payment successful', response);
          window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`;
        },
        prefill: {
          name: 'User Name',
          email: 'user@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#b00403',
        },
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };
  };

  return (
    <Button onClick={onCheckout} size="lg" className="bg-[#1ab964] hover:bg-[#18a258] sm:w-fit">
      {event.isFree ? 'Get Ticket' : 'Buy Ticket'}
    </Button>
  );
};

export default Checkout;
