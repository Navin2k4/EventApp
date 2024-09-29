import React, { useEffect, useState } from "react";
import { IEvent } from "@/lib/database/models/event.model";
import { Button } from "../ui/button";
import { createOrder, checkoutOrder } from "@/lib/actions/order.action";
import { getUserById } from "@/lib/actions/user.actions";
import FreeModal from "../shared/FreeModal";

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature?: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Checkout = ({ event, userId }: { event: IEvent; userId: string }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const onCheckout = async () => {
    const audio = new Audio("/assets/sounds/checkout-click.mp3");
    audio.play();
  
    const currentUser = await getUserById(userId);
    
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    };
  
    if (event.isFree) {
      // Open modal for free event confirmation
      setModalOpen(true);
    } else {
      const res = await checkoutOrder(order);
  
      const { orderId, amount, currency, key } = res;
  
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
  
      script.onload = () => {
        const options = {
          key,
          amount,
          currency,
          order_id: orderId,
          name: "Event Payment",
          description: `Payment for ${event.title}`,
          handler: async function (response: RazorpayResponse) {
            console.log("Payment successful", response);
  
            const newOrder = {
              paymentId: response.razorpay_payment_id,
              eventId: event._id,
              buyerId: userId,
              totalAmount: amount ? (Number(amount) / 100).toString() : "0",
              createdAt: new Date(),
              attended:false,
            };
  
            await createOrder(newOrder);
  
            window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`;
          },
          prefill: {
            name: `${currentUser.firstName} ${currentUser.lastName}`,
            email: currentUser.email,
            contact: currentUser.phone ? currentUser.phone.replace("+", "") : "",
          },
          theme: {
            color: "#b00403",
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
    }
  };

  // Function to confirm free order after modal confirmation
  const confirmFreeOrder = async () => {
    const newOrder = {
      paymentId: `FREE_${userId}`,
      eventId: event._id,
      buyerId: userId,
      totalAmount: "0",
      createdAt: new Date(),
      attended:false
    };
    await createOrder(newOrder);
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`;
    setModalOpen(false); 
  };

  const eventCapacity = event.eventCapacity ?? 0;
  const isCapacityReached = eventCapacity <= 0;

  return (
    <div className="flex flex-col items-center">
      {isCapacityReached && (
        <p className="text-red-600 mb-2">Event booking reached capacity!</p>
      )}
      <Button
        onClick={onCheckout}
        size="lg"
        className={`${
          isCapacityReached ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1ab964] hover:bg-[#18a258]'
        } sm:w-fit`}
        disabled={isCapacityReached}
      >
        {event.isFree ? 'Get Ticket' : 'Buy Ticket'} {eventCapacity > 0 && `(${eventCapacity} available)`}
      </Button>

      {/* Modal for Free Ticket Confirmation */}
      <FreeModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}  // Handle modal close
        onConfirm={confirmFreeOrder}  // Handle confirmation
      />
    </div>
  );
};

export default Checkout;
