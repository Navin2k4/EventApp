import CheckoutButton from '@/components/shared/CheckoutButton';
import Collection from '@/components/shared/Collection';
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.action';
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types'
import Image from 'next/image';
import Link from 'next/link';

const EventDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
  const event = await getEventById(id);
  
  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  })

  return (
    <div className="bg-[#1e1f23] pb-8">
    <section className="flex justify-center bg-[#44454a]  bg-dotted-pattern bg-contain">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <div className='relative'>
        <Link href='' className='absolute right-2 top-2 flex flex-col gap-4 rounded-full bg-white/70 p-4 shadow-lg backdrop-blur-[2px] transition-all hover:bg-white'>
            <Image
              src="/assets/icons/share.svg"
              alt="share"
              width={20}
              height={20}
            />
          </Link>
        <Image 
          src={event.imageUrl}
          alt="hero image"
          width={1000}
          height={1000}
          className="h-full min-h-[300px] object-cover object-center"
        />
        </div>

        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className='h2-bold text-white'>{event.title}</h2>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <div className='flex rounded-full items-center justify-center px-5 bg-[#e41312] '>
                <p className="p-bold-20  text-white">
                  {event.isFree ? 'FREE' : `Rs.${event.price} / `}
                </p>
                {!event.isFree && (<Image src="/assets/icons/person.svg" alt="person" height={25} width={25} />)}
                  </div>
                <p className="p-medium-16 rounded-full bg-primary-500 px-4 py-2.5 text-white">
                  {event.category.name}
                </p>
              </div>

              <p className="p-medium-18 ml-2 mt-2 sm:mt-0 text-white">
                @{event.organizer.firstName} {event.organizer.lastName}
              </p>
            </div>
          </div>

          <CheckoutButton event={event} />

          <div className="flex flex-col gap-5">
            <div className='flex gap-2 md:gap-3'>
              <Image src="/assets/icons/calendar.svg" alt="calendar" width={32} height={32} />
              <div className="text-white p-medium-16 lg:p-regular-20 flex flex-col flex-wrap items-start">
                <p>
                  {formatDateTime(event.startDateTime).dateOnly} - {' '}
                  {formatDateTime(event.startDateTime).timeOnly}
                </p>
                <p>
                  {formatDateTime(event.endDateTime).dateOnly} -  {' '}
                  {formatDateTime(event.endDateTime).timeOnly}
                </p>
              </div>
            </div>

            <div className="p-regular-20 flex items-center gap-3">
              <Image src="/assets/icons/location.svg" alt="location" width={32} height={32} />
              <p className=" text-white p-medium-16 lg:p-regular-20">{event.location}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="p-bold-20 text-white">Event Description :</p>
            <p className="p-medium-16 lg:p-regular-18 text-white">{event.description}</p>
            <p className="p-medium-16 lg:p-regular-18 truncate text-blue-400 underline">{event.url}</p>
          </div>
        </div>
      </div>
    </section>

    {/* EVENTS with the same category */}
    <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
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
  )
}

export default EventDetails