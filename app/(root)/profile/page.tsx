import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.action";
import { getOrdersByUser } from "@/lib/actions/order.action";
import { getUserById } from "@/lib/actions/user.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  console.log(sessionClaims);

  const userId = sessionClaims?.userId as string;

  const currentUser = await getUserById(userId);

  const ordersPage = Number(searchParams.ordersPage) || 1;
  const eventsPage = Number(searchParams.eventsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage });

  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];

  const organizedEvents = await getEventsByUser({ userId, page: ordersPage });
  return (
    <div className="bg-[#1e1f23]">
      {/* My Tickets */}
      <section className="bg-[#1e1f23] bg-dotted-pattern bg-cover bg-center pt-24">
        <div className="wrapper flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <h3 className="h3-bold text-[#e41312] text-2xl sm:text-3xl tracking-widest overline mb-4">
              My Tickets
            </h3>
            <p className="text-center text-gray-300 mb-6">
              Keep track of your purchased tickets and upcoming events.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="button  text-white border-2 bg-transparent backdrop-blur-lg border-red-600 hover:bg-red-600 transition duration-200"
          >
            <Link href="/#events">Explore More Events</Link>
          </Button>
        </div>

        <section className="wrapper mt-8">
          <Collection
            data={orderedEvents}
            emptyTitle="No Tickets Purchased Yet"
            emptyStateSubtext="No Worries - Plenty of Exciting Events to Explore"
            collectionType="My_Tickets"
            limit={3}
            page={ordersPage}
            urlParamName="ordersPage"
            totalPages={orders?.totalPages}
          />
        </section>
      </section>

      {/* Events Organized */}
      <section className="bg-[#1e1f23] bg-dotted-pattern bg-cover bg-center py-12 md:py-16 mt-10 shadow-lg">
        <div className="wrapper flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <h3 className="h3-bold text-[#e41312] text-2xl sm:text-3xl tracking-widest overline mb-4">
              Events Organized
            </h3>
            <p className="text-center text-gray-300">
              Manage and view the events you've created.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="button  text-white border-2 bg-transparent backdrop-blur-lg border-red-600 hover:bg-red-600 transition duration-200"
          >
            <Link href="/events/create">Create New Event</Link>
          </Button>
        </div>

        <section className="wrapper mt-8">
          <Collection
            data={organizedEvents?.data}
            emptyTitle="No Events Created Yet"
            emptyStateSubtext="Go and Create One Now"
            collectionType="Events_Organized"
            limit={3}
            page={eventsPage}
            urlParamName="eventsPage"
            totalPages={organizedEvents?.totalPages}
          />
        </section>
      </section>
    </div>
  );
};

export default ProfilePage;
