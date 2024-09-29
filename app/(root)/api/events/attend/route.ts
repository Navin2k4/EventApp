import Order from "@/lib/database/models/order.model";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Fetch session details from Clerk
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Extract orderId from query parameters
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("eventId");

  if (!eventId) {
    return NextResponse.json(
      { error: "Event ID not provided" },
      { status: 400 }
    );
  }

  // Fetch the order
  const order = await Order.findOne({ event: eventId, buyer: userId });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  console.log(order);
  console.log(userId);

  // Check if the current user is the buyer of the order
  if (order.buyer == userId) {
    // Update the order to set attended to true
    const updatedOrder = await Order.findByIdAndUpdate(
      order._id,
      {
        attended: true,
      },
      { new: true }
    );

    console.log(updatedOrder);
    redirect(`/events/${eventId}`);
    return NextResponse.json({ message: "Order updated", updatedOrder });
  } else {
    return NextResponse.json(
      { error: "Unauthorized access to this order" },
      { status: 403 }
    );
  }
}
