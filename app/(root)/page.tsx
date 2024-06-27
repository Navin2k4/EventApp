import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.action";
import { SearchParamProps } from "@/types";
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
    <div className=" bg-[#c8c8c8]">
      <section className="bg-[#1e1f23] bg-dotted-pattern bg-contain min-h-screen py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold text-white">
              Discover, Engage, Thrive: TURF Events Await!
            </h1>
            <p className="p-regular-20 md:p-regular-24 text-white">
              Explore and celebrate unforgettable experiences at TURF's premier
              events.
            </p>
            <Button size="lg" asChild className="w-full sm:w-fit">
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>
          <Image
            src="/assets/images/hero3.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[80vh] object-contain object-center 2xl:max-h-[50vh] rounded-lg"
          />
        </div>
      </section>

      <section
        id="events"
        className="wrapper mt-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
        Discover a world of <br/> exciting events.
        </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search placeholder="Search" />
          <CategoryFilter />
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
