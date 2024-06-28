import React from 'react';
import { Order } from '@/types'; // Adjust path as needed

type TotalRevenueCardProps = {
  orders: Order[];
};

const TotalRevenueCard: React.FC<TotalRevenueCardProps> = ({ orders }) => {
  const formatPrice = (amount: number) => {
    if (isNaN(amount)) {
      throw new Error(`Expected 'amount' to be a valid number, got '${amount}'`);
    }
    const formattedAmount = amount.toFixed(2); 
    return `Rs. ${formattedAmount}`;
  };

  // Calculate total revenue from orders
  const totalRevenue = orders.reduce((total: number, order: Order) => {
    return total + Number(order.totalAmount);
  }, 0);

  // Determine event title or display message if no orders
  const eventTitle = orders.length > 0 ? orders[0].eventTitle : '';

  // Conditionally render based on whether there are orders or not
  return (
    <div className="bg-gray-200 rounded-lg shadow-md p-6">
      {orders.length > 0 ? (
        <>
          <h3 className="text-xl font-semibold mb-4">Total Revenue</h3>
          <div className="text-3xl font-bold text-primary-500">{formatPrice(totalRevenue)}</div>
          <p className="text-gray-500 mt-2">
            Total revenue generated from <span className='font-bold'>{eventTitle}</span> bookings.
          </p>
        </>
      ) : (
        <p className="text-gray-500 mt-2 text-center">
          No orders made yet for this event. Come again later or share the event!
        </p>
      )}
    </div>
  );
};

export default TotalRevenueCard;
