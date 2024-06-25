import EventForm from '@/components/shared/EventForm'
import { auth } from '@clerk/nextjs';
import React from 'react'

const CreateEvent = () => {
    const {sessionClaims} = auth();
    const userId = sessionClaims!.userId as string; 
    
    return (
    <div className='bg-slate-200'>
    <section className='bg-slate-200 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <h3 className='wrapper h3-bold text-center sm:text-left'>Create Event</h3>
    </section>
    <div className='wrapper my-8'>
        <EventForm userId={userId} type="Create"/>
    </div>
    </div>
  )
}

export default CreateEvent