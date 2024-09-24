"use server"

import Stripe from 'stripe';
import { CheckoutOrderParams, CreateOrderParams, GetOrdersByEventParams, GetOrdersByUserParams } from "@/types"
import { redirect } from 'next/navigation';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import Order from '../database/models/order.model';
import Event from '../database/models/event.model';
import {ObjectId} from 'mongodb';
import User from '../database/models/user.model';
import Razorpay from 'razorpay';

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!, 
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const price = order.isFree ? 0 : Number(order.price) * 100;

  try {
    // Create Razorpay order
    const paymentOrder = await razorpay.orders.create({
      amount: price,
      currency: 'INR',
      receipt: order.eventId,
      notes: {
        eventId: order.eventId,
        buyerId: order.buyerId,
      },
    });

    // Redirect to Razorpay's frontend checkout
    if (typeof window !== 'undefined') {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: paymentOrder.amount,
        currency: paymentOrder.currency,
        name: order.eventTitle,
        description: 'Event Ticket',
        order_id: paymentOrder.id,
        handler: function (response: any) {
          console.log(response);
          // Handle successful payment
          window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`;
        },
        prefill: {
          email: 'buyer@example.com', // Replace with buyer email
          contact: '9999999999', // Replace with buyer contact number
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    }
  } catch (error) {
    console.error('Payment initiation failed', error);
    throw error;
  }
};

export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase();
    
    const newOrder = await Order.create({
      ...order,
      event: order.eventId,
      buyer: order.buyerId,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
}

// GET ORDERS BY EVENT
export async function getOrdersByEvent({ searchString, eventId }: GetOrdersByEventParams) {
  try {
    await connectToDatabase()

    if (!eventId) throw new Error('Event ID is required')
    const eventObjectId = new ObjectId(eventId)

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
          eventTitle: '$event.title',
          eventId: '$event._id',
          buyer: {
            $concat: ['$buyer.firstName', ' ', '$buyer.lastName'],
          },
          buyerId: '$buyer._id',
          buyerMail: '$buyer.email'
        },
      },
      {
        $match: {
          $and: [
            { eventId: eventObjectId },
            { $or: [
              { 'buyer': { $regex: RegExp(searchString, 'i') } },
              { 'buyerMail': { $regex: RegExp(searchString, 'i') } }
            ]}
          ],
        },
      },
    ])

    return JSON.parse(JSON.stringify(orders))
  } catch (error) {
    handleError(error)
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