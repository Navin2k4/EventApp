import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getAllEvents, getEventTitlesWithFormattedDates } from "@/lib/actions/event.action";
import { SearchParamProps } from "@/types";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Users, Zap } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-[#0f1014] to-[#1e1f23]">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 mix-blend-multiply" />
          <Image
            src="/hero-background.jpg"
            alt="Hero Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
            className="object-center"
          />
        </div>

        <div className="wrapper relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
              Where Campus Life <span className="text-[#e41312]">Comes Alive</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-xl">
              Discover, participate, and create memorable experiences in your college community.
              Join events that shape your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <SignedOut>
                <Button size="lg" className="bg-[#e41312] hover:bg-[#c00303] text-lg px-8">
                  Get Started
                </Button>
              </SignedOut>
              <SignedIn>
                <Button size="lg" className="bg-[#e41312] hover:bg-[#c00303] text-lg px-8">
                  Create Event
                </Button>
              </SignedIn>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Explore Events
              </Button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">Upcoming Highlights</h3>
              <div className="space-y-3">
                {listEvents.slice(0, 3).map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
                  >
                    <Calendar className="text-[#e41312]" />
                    <div>
                      <p className="text-white font-medium">{event.title}</p>
                      <p className="text-gray-400 text-sm">{event.startDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 wrapper">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Users, label: 'Active Users', value: '2,000+' },
            { icon: Calendar, label: 'Events Hosted', value: '500+' },
            { icon: Zap, label: 'Success Rate', value: '98%' },
          ].map((stat, index) => (
            <div key={index} className="bg-white/5 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
              <stat.icon className="w-12 h-12 text-[#e41312] mx-auto mb-4" />
              <h4 className="text-2xl font-bold text-white mb-2">{stat.value}</h4>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="wrapper py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Discover Amazing Events
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Browse through our curated collection of events designed to enhance your college experience
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <CategoryFilter />
          <Search placeholder="Search events..." />
        </div>

        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later for new events!"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>

      {/* CTA Section */}
      <section className="wrapper py-20">
        <div className="bg-gradient-to-r from-[#e41312] to-[#ff4b48] rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Create Your Own Event?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Take the lead and organize an event that matters. Share your passion with the community.
          </p>
          <Button size="lg" variant="secondary" className="text-[#e41312]">
            Start Creating <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
