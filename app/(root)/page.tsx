import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import { GlareCardDemo } from "@/components/shared/GlareCardDemo";
import Search from "@/components/shared/Search";
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
      <section className="bg-[#1e1f23] bg-dotted-pattern bg-contain min-h-screen pb-20 ">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold text-white">
              Discover, Engage, Thrive:{" "}
              <span className="text-[#f73835]">TURF</span> Events Await!
            </h1>
            <p className="p-regular-20 md:p-regular-24 text-white">
              Explore and celebrate unforgettable experiences at TURF's premier
              events.
            </p>
            <SignedOut>
              <Button
                size="lg"
                asChild
                className="w-full bg-[#e41312] hover:bg-[#c00303] sm:w-fit"
              >
                <Link href="#about">Explore Now</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button
                size="lg"
                asChild
                className="w-full bg-[#e41312] hover:bg-[#c00303] sm:w-fit"
              >
                <Link href="#events">Book an Event or Create One</Link>
              </Button>
            </SignedIn>
          </div>
          <div className="relative flex justify-center items-center">
            <Image
              src="/assets/images/hero3.png"
              alt="new image"
              width={1000}
              height={1000}
              className="absolute top-1 sm:top-0 h-[550px] lg:h-auto"
            />
            <Image
              src="/assets/icons/blob.svg"
              alt="hero"
              width={1000}
              height={1000}
              className="max-h-[80vh] object-contain object-center 2xl:max-h-[50vh] rounded-lg"
            />
          </div>
        </div>
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
        className="wrapper mt-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold text-white">
          Discover a world of <br /> exciting{" "}
          <span className="text-[#f73835]">events.</span>
        </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <CategoryFilter />
          <Search placeholder="Search" />
        </div>

        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </div>
  );
}
