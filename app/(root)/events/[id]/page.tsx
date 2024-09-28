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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  MapPin,
  Share2,
  User,
  Clock,
  ExternalLink,
} from "lucide-react";
import CopyLinkButton from "@/components/shared/CopyLinkButton";

const EventDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });


  return (
    <div className=" bg-black pb-24">
      <section className="w-full bg-gradient-to-b pt-24 py-12">
        <div className="container mx-auto px-4">
          <Card className=" overflow-hidden  border-none">
            <div className="flex flex-col lg:flex-row">
              <div className="relative w-full lg:w-1/2 h-64 lg:h-auto shadow-xl">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  layout="fill"
                  objectFit="cover"
                />
                <CopyLinkButton eventId={event._id} />
              </div>

              <CardContent className="w-full lg:w-1/2 p-6 lg:p-10 bg-gray-300">
                <CardHeader className="p-0 mb-6">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <Badge
                      variant={
                        event.isFree || event.price == ""
                          ? "outline"
                          : "destructive"
                      }
                      className="text-lg py-1 px-3 border-white"
                    >
                      {event.isFree || event.price == ""
                        ? "FREE"
                        : `Rs.${event.price}`}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-purple-100  border-black text-md py-1 px-3"
                    >
                      {event.category.name}
                    </Badge>
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Organized by {event.organizer.firstName}{" "}
                    {event.organizer.lastName}
                  </CardDescription>
                </CardHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-red-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">Date</p>
                      <p className="text-gray-600">
                        {formatDateTime(event.startDateTime).dateOnly}
                      </p>
                      <p className="text-gray-600">
                        {formatDateTime(event.endDateTime).dateOnly}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-red-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">Time</p>
                      <p className="text-gray-600">
                        {formatDateTime(event.startDateTime).timeOnly} -{" "}
                        {formatDateTime(event.endDateTime).timeOnly}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-red-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">Location</p>
                      <p className="text-gray-600">{event.location}</p>
                    </div>
                  </div>
                </div>

                {/* <Separator className="my-6 text-black"  /> */}

                <div className="space-y-4 mb-8">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Event Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {event.description}
                  </p>
                  <Link
                    href={event.url}
                    className="inline-flex items-center text-red-600 hover:text-purple-800 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Event Website
                  </Link>
                </div>

                <CheckoutButton event={event} />
              </CardContent>
            </div>
          </Card>
        </div>
      </section>
      {/* EVENTS with the same category */}

      <section className="wrapper  flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold text-[#e41312]">Related Events</h2>

        <Collection
          data={relatedEvents?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={3}
          page={searchParams.page as string}
          totalPages={relatedEvents?.totalPages}
        />
      </section>
    </div>
  );
};

export default EventDetails;
