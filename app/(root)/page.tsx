import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import { GlareCardDemo } from "@/components/shared/GlareCardDemo";
import Search from "@/components/shared/Search";
import { StickyScrollRevealDemo } from "@/components/shared/StickyScrollRevealDemo";
import { Button } from "@/components/ui/button";
import { featureCards } from "@/constants";
import { getAllEvents } from "@/lib/actions/event.action";
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

  return (
    <div className=" bg-[#1e1f23]">
      <section className="relative bg-[#1e1f23] bg-dotted-pattern bg-contain min-h-screen pb-20 sm:pb-40 flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/bg1.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>
      
      <div className="wrapper relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-4">
        <h1 className="h1-bold text-white mb-6">
          Connect, Participate, Excel, Campus Events Await!
        </h1>
        <p className="p-regular-20 sm:p-regular-24 text-white mb-8">
          Discover and engage in the vibrant college community by joining exciting campus events. Be a part of unforgettable experiences that foster growth and connection.
        </p>
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
            className="w-full text-md lg:text-lg bg-[#e41312] hover:bg-[#c00303] sm:w-fit p-8"
          >
            <Link href="#events">Book an Event or Create One</Link>
          </Button>
        </SignedIn>
      </div>
    </section>
      <section  id="provisions" className="wrapper my-5">
      <h2 className="h2-bold text-center text-white">
      Cultivating Connections Through Every Event!{' '}
        </h2>
          <StickyScrollRevealDemo />
      </section>

      <section id="about" className="bg-[#1e1f23] p-5 lg:py-10">
        <h2 className="text-white h2-bold text-center pb-10">
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

      <section
      id="events"
      className="wrapper mt-10 flex flex-col gap-8 md:gap-12 bg-gradient-to-br  px-4 sm:px-6 lg:px-8 rounded-3xl shadow-2xl"
    >
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Discover a world of <br className="hidden sm:inline" />
          exciting <span className="text-[#f73835] animate-pulse">events.</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Explore and join amazing experiences happening around you.
        </p>
      </div>

      <div className="flex w-full flex-col gap-5 md:flex-row justify-center items-center">
        <div className="w-full md:w-1/3">
          <CategoryFilter />
        </div>
        <div className="w-full md:w-2/3">
          <Search placeholder="Search for events" />
        </div>
      </div>

      <Collection
        data={events?.data}
        emptyTitle="No Events Found"
        emptyStateSubtext="Come back later for exciting new events!"
        collectionType="All_Events"
        limit={6}
        page={page}
        totalPages={events?.totalPages}
      />
    </section>
    </div>
  );
}
