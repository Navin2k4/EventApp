import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { Toaster } from "../ui/sonner";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isEventCreator = userId === event.organizer._id.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-400px flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-gray-500"
      />
      {/* IS EVENT CREATOR */}

      {isEventCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white/70 p-3 shadow-lg backdrop-blur-[2px] transition-all hover:bg-white">
          <Link href={`/event/${event._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>
          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      <Link
        href={`/events/${event._id}`}
        className="flex min-h-[200px] flex-col gap-3 p-5 md:gap-4"
      >
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
              {event.isFree ? "FREE" : `Rs.${event.price}`}
            </span>
            <p className="p-semibold-14 w-min rounded-full bg-gray-500/10 px-4 py-1 text-gray-500">
              {event.category.name}
            </p>
          </div>
        )}
        <p className="p-medium-16 p-medium-18 text-gray-500">
          {formatDateTime(event.startDateTime).dateTime} -{" "}
          {formatDateTime(event.endDateTime).dateTime}
        </p>
        <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
          {event.title}
        </p>
        <div className="flex-between w-full ">
          <p className="p-medium-14 md:p-medium-16 text-gray-600">
            {event.organizer.firstName} {event.organizer.lastName}
          </p>
          {hasOrderLink && (
            <Link href={`/orders?/eventId=${event._id}`} className="flex gap-2">
              <p className="text-primary-500 ">Order Details</p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="search"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Card;
