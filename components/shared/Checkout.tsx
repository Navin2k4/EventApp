import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { checkoutOrder } from '@/lib/actions/order.action';
import { IEvent } from '@/lib/database/models/event.model';

const Checkout = ({ event, userId }: { event: IEvent, userId: string }) => {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed successfully!');
    }
    if (query.get('canceled')) {
      console.log('Order canceled.');
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

    await checkoutOrder(order); // Calls the new Razorpay integration
  };

  return (
    <form action={onCheckout} method="post">
      <Button type="submit" role="link" size="lg" className="bg-[#1ab964] hover:bg-[#18a258] sm:w-fit">
        {event.isFree ? 'Get Ticket' : 'Buy Ticket'}
      </Button>
    </form>
  );
};

export default Checkout;
