import CheckoutButton from "@/components/shared/CheckoutButton";
import Collection from "@/components/shared/Collection";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.action";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  User,
  Clock,
  ExternalLink,
  Users,
  Mail,
  Map,
  QrCode,
  Download,
} from "lucide-react";
import CopyLinkButton from "@/components/shared/CopyLinkButton";
import { Key } from "react";
import { auth } from "@clerk/nextjs";
import { hasUserBoughtEvent } from "@/lib/actions/order.action";
import QRComp from "@/components/shared/QRComp";

const EventDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const event = await getEventById(id);
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isEventCreator = userId === event.organizer._id.toString();
  const isPurchased = await hasUserBoughtEvent(userId, event._id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1014] to-[#1e1f23]">
      {/* Hero Banner */}
      <div className="relative h-[40vh] lg:h-[50vh] w-full">
        <Image
          src={event.imageUrl}
          alt={event.title}
          layout="fill"
          objectFit="cover"
          className="brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
        
        {/* Floating Event Status */}
        <div className="absolute bottom-6 right-6 flex gap-3">
          <CopyLinkButton eventId={event._id} />
          {isEventCreator && (
            <div className="bg-white/90 backdrop-blur-md rounded-lg p-3 shadow-lg flex items-center gap-3">
              <QRComp eventId={event._id.toString()} eventTitle={event.title} />
              <div className="text-sm font-medium">
                <p>Download QR</p>
                <p>for Attendance</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Event Title Section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10 bg-gradient-to-t from-black/80 to-transparent">
          <div className="wrapper">
            <div className="flex flex-wrap gap-3 mb-4">
              {isPurchased && (
                <Badge className="bg-green-500/20 text-green-500 border-green-500/50 text-sm">
                  Purchased
                </Badge>
              )}
              <Badge className={event.isFree ? "bg-blue-500/20 text-blue-500" : "bg-[#e41312]/20 text-[#e41312]"}>
                {event.isFree ? "FREE" : `₹${event.price}`}
              </Badge>
              <Badge variant="outline" className="bg-purple-500/20 text-purple-500 border-purple-500/50">
                {event.category.name}
              </Badge>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">{event.title}</h1>
            <div className="flex items-center gap-2 text-gray-300">
              <User className="w-4 h-4" />
              <p>Organized by {event.organizer.firstName} {event.organizer.lastName}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="wrapper py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Details */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 space-y-6">
              <h2 className="text-2xl font-semibold text-white">About Event</h2>
              <p className="text-gray-300 leading-relaxed">{event.description}</p>
              
              {event.url && (
                <a 
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-[#e41312] hover:text-[#ff4b48] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Event Website
                </a>
              )}
            </div>

            {/* Event Location */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-white">Location</h2>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#e41312] mt-1" />
                <p className="text-gray-300">{event.location}</p>
              </div>
              {event.mapLocation && (
                <div className="mt-4 rounded-lg overflow-hidden">
                  <iframe
                    src={event.mapLocation}
                    width="100%"
                    height="300"
                    loading="lazy"
                    className="border-0"
                  />
                </div>
              )}
            </div>

            {/* Coordinators */}
            {event.coordinators && event.coordinators.length > 0 && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-white">Event Coordinators</h2>
                <div className="grid gap-4">
                  {event.coordinators.map((coordinator: any, index: any) => (
                    <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                      <div>
                        <p className="text-white font-medium">{coordinator.name}</p>
                        <p className="text-gray-400 text-sm">{coordinator.email}</p>
                        <p className="text-gray-400 text-sm">{coordinator.phone}</p>
                      </div>
                      <a
                        href={`mailto:${coordinator.email}`}
                        className="flex items-center gap-2 text-[#e41312] hover:text-[#ff4b48] transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Contact</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Info Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Event Details</h3>
                {event.eventCapacity && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <Users className="w-4 h-4" />
                    <span>{event.eventCapacity} spots</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#e41312] mt-1" />
                  <div>
                    <p className="text-white font-medium">Date</p>
                    <p className="text-gray-400">
                      {formatDateTime(event.startDateTime).dateOnly} - {formatDateTime(event.endDateTime).dateOnly}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#e41312] mt-1" />
                  <div>
                    <p className="text-white font-medium">Time</p>
                    <p className="text-gray-400">
                      {formatDateTime(event.startDateTime).timeOnly} - {formatDateTime(event.endDateTime).timeOnly}
                    </p>
                  </div>
                </div>
              </div>

              {/* Purchase/QR Section */}
              <div className="pt-4 border-t border-gray-700">
                {isPurchased ? (
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <p className="text-white mb-3">Show QR for Attendance</p>
                    <button className="mx-auto p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                      <QrCode className="w-6 h-6 text-white" />
                    </button>
                  </div>
                ) : (
                  <CheckoutButton event={event} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Events */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-white mb-8">Similar Events</h2>
          <Collection
            data={relatedEvents?.data}
            emptyTitle="No Related Events Found"
            emptyStateSubtext="Check back later for more events"
            collectionType="All_Events"
            limit={3}
            page={searchParams.page as string}
            totalPages={relatedEvents?.totalPages}
          />
        </section>
      </div>
    </div>
  );
};

export default EventDetails;
