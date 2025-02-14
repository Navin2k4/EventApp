import React from 'react';
import { Order } from '@/types';
import { IndianRupee, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

type TotalRevenueCardProps = {
  orders: Order[];
};

const TotalRevenueCard: React.FC<TotalRevenueCardProps> = ({ orders }) => {
  const formatPrice = (amount: number) => {
    if (isNaN(amount)) {
      throw new Error(`Invalid amount: ${amount}`);
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalRevenue = orders.reduce((total: number, order: Order) => {
    return total + Number(order.totalAmount);
  }, 0);

  // Calculate some additional stats
  const paidOrders = orders.filter(order => !order.isFree);
  const averageOrderValue = paidOrders.length
    ? totalRevenue / paidOrders.length
    : 0;

  return (
    <div className="space-y-6">
      {orders.length > 0 ? (
        <>
          {/* Main Revenue Display */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 mb-1">Total Revenue</p>
              <div className="flex items-center gap-2">
                <h2 className="text-3xl font-bold text-white">
                  {formatPrice(totalRevenue)}
                </h2>
                <div className="flex items-center px-2 py-1 text-xs font-medium text-green-400 bg-green-400/10 rounded-full">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  12%
                </div>
              </div>
            </div>
            <div className="h-12 w-12 rounded-xl bg-[#e41312]/10 flex items-center justify-center">
              <IndianRupee className="h-6 w-6 text-[#e41312]" />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-[#e41312]" />
                <p className="text-sm text-gray-400">Avg. Order Value</p>
              </div>
              <p className="text-lg font-semibold text-white">
                {formatPrice(averageOrderValue)}
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-[#e41312]" />
                <p className="text-sm text-gray-400">Paid Orders</p>
              </div>
              <p className="text-lg font-semibold text-white">
                {paidOrders.length}
              </p>
            </div>
          </div>

          {/* Recent Transactions */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">Recent Orders</h3>
            <div className="space-y-2">
              {orders.slice(0, 3).map((order, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{order.buyer}</p>
                    <p className="text-xs text-gray-400">{order.buyerMail}</p>
                  </div>
                  <p className="text-sm font-medium text-white">
                    {formatPrice(order.totalAmount)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <div className="h-12 w-12 rounded-xl bg-[#e41312]/10 flex items-center justify-center mx-auto mb-4">
            <IndianRupee className="h-6 w-6 text-[#e41312]" />
          </div>
          <p className="text-gray-400">
            No orders yet. Share your event to start generating revenue!
          </p>
        </div>
      )}
    </div>
  );
};

export default TotalRevenueCard;
