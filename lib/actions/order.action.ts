"use server"

import { CheckoutOrderParams, CreateOrderParams, GetOrdersByEventParams, GetOrdersByUserParams } from "@/types"
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import Order from '../database/models/order.model';
import Event from '../database/models/event.model';
import {ObjectId} from 'mongodb';
import User from '../database/models/user.model';
import Razorpay from 'razorpay';

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  const price = order.isFree ? 0 : Number(order.price) * 100; // Convert to smallest currency unit (e.g., paise for INR)

  try {
    const options = {
      amount: price,
      currency: 'INR',
      receipt: `receipt_order_${order.eventId}`,
      notes: {
        eventId: order.eventId,
        buyerId: order.buyerId,
      }
    };

    const razorpayOrder = await razorpay.orders.create(options);
    return {
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    };
  } catch (error) {
    throw error;
  }
};


export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase();
    const event = await Event.findById(order.eventId);
    if (!event) {
      throw new Error("Event not found.");
    }
    if (event.capacity <= 0) {
      throw new Error("No capacity available for this event.");
    }
    const newOrder = await Order.create({
      ...order,
      event: order.eventId,
      buyer: order.buyerId,
    });
    event.eventCapacity -= 1;
    await event.save();
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
}

// GET ORDERS BY EVENT
export async function getOrdersByEvent({ searchString, eventId }: GetOrdersByEventParams) {
  try {
    await connectToDatabase();

    if (!eventId) throw new Error('Event ID is required');
    const eventObjectId = new ObjectId(eventId);

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'buyer',
          foreignField: '_id',
          as: 'buyer',
        },
      },
      {
        $unwind: '$buyer',
      },
      {
        $lookup: {
          from: 'events',
          localField: 'event',
          foreignField: '_id',
          as: 'event',
        },
      },
      {
        $unwind: '$event',
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          paymentId: 1,  // Include paymentId in the projection
          eventTitle: '$event.title',
          eventId: '$event._id',
          buyer: {
            $concat: ['$buyer.firstName', ' ', '$buyer.lastName'],
          },
          buyerId: '$buyer._id',
          buyerMail: '$buyer.email',
          buyerPhone: '$buyer.phone'
        },
      },
      {
        $match: {
          $and: [
            { eventId: eventObjectId },
            {
              $or: [
                { buyer: { $regex: RegExp(searchString, 'i') } },
                { buyerMail: { $regex: RegExp(searchString, 'i') } },
              ],
            },
          ],
        },
      },
    ]);

    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    handleError(error);
  }
}


// GET ORDERS BY USER
export async function getOrdersByUser({ userId, limit = 3, page }: GetOrdersByUserParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { buyer: userId }

    const orders = await Order.distinct('event._id')
      .find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: 'event',
        model: Event,
        populate: {
          path: 'organizer',
          model: User,
          select: '_id firstName lastName',
        },
      })

    const ordersCount = await Order.distinct('event._id').countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(orders)), totalPages: Math.ceil(ordersCount / limit) }
  } catch (error) {
    handleError(error)
  }
}

export async function hasUserBoughtEvent(userId: string, eventId: string ) {
  try {
    const order = await Order.findOne({
      buyer: userId,
      event: eventId,
    });

    // Return true if an order exists, otherwise return false
    return order !== null;
  } catch (error) {
    console.error("Error checking purchase status:", error);
    return false; // Handle error appropriately, could also throw error or return null based on your needs
  }
};
