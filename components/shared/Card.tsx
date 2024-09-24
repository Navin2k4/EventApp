import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  MapPin,
  User,
  ArrowRight,
  Edit,
  Trash2,
  IndianRupee,
} from "lucide-react";
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
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-slate-100 shadow-lg transition-all duration-300 hover:shadow-2xl w-full max-w-[400px]">
      <div className="relative aspect-[4/2] w-full  overflow-hidden">
      <Link href={`/events/${event._id}`}>
        <Image
          src={event.imageUrl}
          alt={event.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
        </Link>
        {isEventCreator && !hidePrice && (
          <div className="absolute right-3 top-3 flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              asChild
              className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
            >
              <Link href={`/events/${event._id}/update`}>
                <Edit className="h-4 w-4" />
              </Link>
            </Button>

            <DeleteConfirmation eventId={event._id} />
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between p-4">
        {!hidePrice && (
          <div className="flex gap-2 items-center justify-end mb-4">
            <Badge
              className={`text-md font-semibold ${
                event.isFree
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {event.isFree ? (
                "FREE"
              ) : (
                <>
                  <IndianRupee className="h-4 w-4 mr-1" /> {event.price}
                </>
              )}
            </Badge>

            <Badge
              variant="secondary"
              className="bg-primary-500 text-md text-white"
            >
              {event.category.name}
            </Badge>
          </div>
        )}

        <div>
          <Link href={`/events/${event._id}`}>
            <h3 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-primary-600 transition-colors mb-2">
              {event.title}
            </h3>
          </Link>

          <div className="flex flex-col gap-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary-500 flex-shrink-0" />
              <p className="line-clamp-1">
                {formatDateTime(event.startDateTime).dateTime} -{" "}
                {formatDateTime(event.endDateTime).dateTime}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary-500 flex-shrink-0" />
              <p className="line-clamp-1">{event.location}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary-500" />
            <p className="text-sm font-medium text-gray-700 line-clamp-1">
              {event.organizer.firstName} {event.organizer.lastName}
            </p>
          </div>
          {hasOrderLink && (
            <Button variant="link" asChild className="p-0">
              <Link
                href={`/orders?eventId=${event._id}`}
                className="flex items-center gap-1 text-primary-600 hover:text-primary-700"
              >
                <span>Orders</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
