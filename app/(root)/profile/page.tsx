import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getEventsByUser } from '@/lib/actions/event.action'
import { getOrdersByUser } from '@/lib/actions/order.action'
import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async ({searchParams}:SearchParamProps) => {

  const {sessionClaims} = auth();
  const userId = sessionClaims?.userId as string;


  const ordersPage = Number(searchParams.ordersPage) || 1;
  const eventsPage = Number(searchParams.eventsPage) || 1;

  const orders = await getOrdersByUser({userId,page:ordersPage});

  const orderedEvents = orders?.data.map((order:IOrder) => order.event) || [];


  const organizedEvents = await getEventsByUser({userId,page:ordersPage});
  return (
    <div className='bg-[#1e1f23]'>
    {/* My Tickets */}
    <section className='bg-[#1e1f23] bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
      <div className='wrapper flex items-center justify-center sm:justify-between'>
        <h3 className='h3-bold text-center  text-[#e41312]  sm:text-left tracking-widest overline'>My Tickets</h3>
        <Button asChild size="lg" className='button hidden bg-primary-500 sm:flex'>
          <Link
            href="/#events"
          >
            Explore More Events
          </Link>
        </Button>
      </div>        
    </section>
    
  <section className="wrapper">
   <Collection 
          data={orderedEvents}
          emptyTitle="No Events Tickets Purchased yet"
          emptyStateSubtext="No Worries - Plenty of Exciting Events to Explore"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName='ordersPage'
          totalPages={orders?.totalPages}
        />
    </section>

    {/* Events Organized */}
    <section className='bg-[#1e1f23] bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
      <div className='wrapper flex  text-[#e41312]  items-center justify-center sm:justify-between'>
        <h3 className='h3-bold text-center sm:text-left tracking-widest overline'>Events Organized</h3>
        <Button asChild size="lg" className='button hidden bg-primary-500 sm:flex'>
          <Link
            href="/events/create"
          >
            Create New Events
          </Link>
        </Button>
      </div>      
    </section>
     <section className="wrapper">
   <Collection 
          data={organizedEvents?.data}
          emptyTitle="No Events have been created yet"
          emptyStateSubtext="Go and Create one Now"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          urlParamName='eventsPage'
          totalPages={organizedEvents?.totalPages}
        />
    </section>
    </div>
  )
}

export default ProfilePage