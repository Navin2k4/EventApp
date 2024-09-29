import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import { GlareCardDemo } from "@/components/shared/GlareCardDemo";
import Search from "@/components/shared/Search";
import { StickyScrollRevealDemo } from "@/components/shared/StickyScrollRevealDemo";
import { Button } from "@/components/ui/button";
import { featureCards } from "@/constants";
import {
  getAllEvents,
  getEventTitlesWithFormattedDates,
} from "@/lib/actions/event.action";
import { SearchParamProps } from "@/types";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });
  const listEvents = await getEventTitlesWithFormattedDates();

  return (
    <div className="bg-[#1e1f23]">
      {/* Hero Section */}
      <section className="relative bg-[#1e1f23] min-h-screen py-20 sm:pb-40  flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/325225/pexels-photo-325225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>

        <div className="wrapper relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Connect, Participate, and Excel!
          </h1>
          <p className="text-lg sm:text-xl text-white mb-8">
            Join our vibrant college community and dive into exciting events
            that foster growth and connection.
          </p>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#e41312] mb-4 mt-6">
              Upcoming Events
            </h2>
            <p className="text-lg text-white mb-4">
              Don't miss out on our upcoming events:
            </p>
            <ul className="list-disc list-inside text-lg text-white space-y-2">
              {listEvents.map((event,index) => (
                <li key={index} className="bg-white/40 backdrop-blur-md text-white text-lg px-4 py-2 rounded-full shadow-lg flex items-center transition duration-300 hover:shadow-xl border border-white/40">
                  {event.title} - {event.startDate}
                </li>
              ))}
            </ul>
          </div>

          <SignedOut>
            <Button
              size="lg"
              asChild
              className="w-full text-md lg:text-lg bg-[#e41312] hover:bg-[#c00303] sm:w-fit"
            >
              <Link href="#about">Explore Now</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Button
              size="lg"
              asChild
              className="w-full text-md lg:text-lg bg-[#e41312] hover:bg-[#c00303] sm:w-fit"
            >
              <Link href="#events">Book or Create an Event</Link>
            </Button>
          </SignedIn>
        </div>
      </section>

      {/* Provisions Section */}
      <section id="provisions" className="wrapper my-5 mt-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white">
          Cultivating Connections Through Every Event!
        </h2>
        <StickyScrollRevealDemo />
      </section>

      {/* About Section */}
      <section id="about" className="bg-[#1e1f23] p-5 lg:py-10">
        <h2 className="text-3xl md:text-4xl text-white font-bold text-center pb-10">
          Explore Our Key Features
        </h2>
        <div className="grid grid-flow-col gap-6 sm:gap-3 justify-evenly overflow-x-auto p-4">
          {featureCards.map((feature) => (
            <div key={feature.id} className="card">
              <GlareCardDemo title={feature.title} points={feature.points} />
            </div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section
        id="events"
        className="mt-16 py-12 px-6 sm:px-10 lg:px-16 bg-gradient-to-br from-[#1e1f23] to-[#0d0e10] rounded-3xl shadow-2xl"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Discover a World of <br className="hidden sm:inline" />
            Exciting{" "}
            <span className="text-[#f73835] animate-pulse">Events</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Dive into amazing experiences happening in your college and around
            you. Stay connected with what's coming up next!
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-1/3 flex justify-center md:justify-start">
            <CategoryFilter />
          </div>
          <div className="w-full md:w-2/3 flex justify-center">
            <Search placeholder="Search for events..." />
          </div>
        </div>

        <div className="mt-12">
          <Collection
            data={events?.data}
            emptyTitle="No Events Found"
            emptyStateSubtext="Check back later for more events!"
            collectionType="All_Events"
            limit={6}
            page={page}
            totalPages={events?.totalPages}
          />
        </div>
      </section>
    </div>
  );
}
