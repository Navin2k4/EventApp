import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";

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
    <div className="group relative flex min-h-[380px] w-full max-w-400px flex-col overflow-hidden rounded-xl bg-white shadow-sm  hover:shadow-slate-300 transition-all duration-300 hover:bg-white md:min-h-[438px]">
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-gray-500"
      />
      {/* IS EVENT CREATOR  then show the delete and the edit functionality to the user it found by matching the session user and the ordanizer id that is the creator of the event*/}
      {isEventCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white/70 p-3 shadow-lg backdrop-blur-[2px] transition-all hover:bg-white">
          <Link href={`/events/${event._id}/update`}>
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

      <div className="flex min-h-[200px] bg-black  flex-col gap-2 p-5 md:gap-4">
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="p-semibold-14  rounded-full px-4 py-1 text-red-200 bg-[#e41312]">
              <div className="flex items-center justify-center ">
                {event.isFree ? "FREE" : `Rs.${event.price} / `}
                {!event.isFree && (
                  <Image
                    src="/assets/icons/person.svg"
                    alt="person"
                    height={16}
                    width={16}
                  />
                )}
              </div>
            </span>
            <p className="p-semibold-14 w-min rounded-full bg-primary-500/70 px-4 py-1 text-white line-clamp-1">
              {event.category.name}
            </p>
          </div>
        )}
        <Link href={`/events/${event._id}`}>
          <p className="p-medium-18 line-clamp-2 pt-2 flex-1 text-white">
            {event.title}
          </p>
        </Link>
        <p className="p-medium-14 py-1 text-gray-400">
          {formatDateTime(event.startDateTime).dateTime} -{" "}
          {formatDateTime(event.endDateTime).dateTime}
        </p>
        <p className="p-medium-14 text-gray-400">{event.location}</p>
        <div className="flex-between w-full ">
          <p className="p-medium-14 md:p-medium-16 text-primary">
            By : {event.organizer.firstName} {event.organizer.lastName}
          </p>
          {hasOrderLink && (
            <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
              <p className="text-white ">Orders</p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="search"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
