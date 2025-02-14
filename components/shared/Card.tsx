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
  Clock,
  ExternalLink,
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
    <div className="w-[380px] h-[480px] group relative bg-[#1e1f23] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
      {/* Image Section - Fixed height */}
      <div className="relative h-[220px] w-full">
        <Link href={`/events/${event._id}`}>
          <Image
            src={event.imageUrl}
            alt={event.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e1f23] via-transparent to-transparent opacity-80" />
        </Link>

        {/* Admin Actions */}
        {isEventCreator && !hidePrice && (
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              size="icon"
              asChild
              className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm"
            >
              <Link href={`/events/${event._id}/update`}>
                <Edit className="h-4 w-4 text-white" />
              </Link>
            </Button>
            <DeleteConfirmation eventId={event._id} />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="relative p-6 h-[260px] flex flex-col">
        {/* Category & Price */}
        {!hidePrice && (
          <div className="flex gap-2 mb-4">
            <Badge
              className={`px-3 py-1 text-xs font-medium ${event.isFree
                  ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                  : "bg-[#e41312]/10 text-[#ff4b48] hover:bg-[#e41312]/20"
                }`}
            >
              {event.isFree ? (
                "FREE"
              ) : (
                <div className="flex items-center">
                  <IndianRupee className="w-3 h-3 mr-0.5" />
                  {event.price}
                </div>
              )}
            </Badge>
            <Badge
              variant="secondary"
              className="px-3 py-1 text-xs font-medium bg-purple-500/10 text-purple-400 hover:bg-purple-500/20"
            >
              {event.category.name}
            </Badge>
          </div>
        )}

        {/* Title */}
        <Link href={`/events/${event._id}`}>
          <h3 className="text-lg font-semibold text-white group-hover:text-[#e41312] transition-colors line-clamp-2 mb-4">
            {event.title}
          </h3>
        </Link>

        {/* Event Details */}
        <div className="space-y-2.5 text-sm flex-grow">
          <div className="flex items-center gap-2 text-gray-400">
            <CalendarDays className="h-4 w-4 text-[#e41312]" />
            <p>{formatDateTime(event.startDateTime).dateOnly}</p>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="h-4 w-4 text-[#e41312]" />
            <p>{formatDateTime(event.startDateTime).timeOnly}</p>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <MapPin className="h-4 w-4 text-[#e41312]" />
            <p className="line-clamp-1">{event.location}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[#e41312]/10 flex items-center justify-center">
              <User className="h-4 w-4 text-[#e41312]" />
            </div>
            <p className="text-sm text-gray-400 font-medium">
              {event.organizer.firstName} {event.organizer.lastName}
            </p>
          </div>

          {hasOrderLink && (
            <Button
              variant="ghost"
              size="sm"
              className="text-[#e41312] hover:text-[#ff4b48] hover:bg-[#e41312]/10 -mr-2"
              asChild
            >
              <Link href={`/orders?eventId=${event._id}`}>
                Orders
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
